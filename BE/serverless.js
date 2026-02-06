const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Express app for serverless
const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI);

// User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  yearlyLeaveQuota: { type: Number, default: 18 },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);

// Leave Schema  
const LeaveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  days: { type: Number, required: true, min: 0.5 },
  type: { type: String, enum: ['paid', 'unpaid', 'sick'], default: 'paid' },
  reason: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Leave = mongoose.model('Leave', LeaveSchema);

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    
    const token = jwt.sign({ sub: user._id, email }, process.env.JWT_SECRET);
    res.status(201).json({ access_token: token, user: { id: user._id, email, yearlyLeaveQuota: user.yearlyLeaveQuota } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ sub: user._id, email }, process.env.JWT_SECRET);
    res.json({ access_token: token, user: { id: user._id, email, yearlyLeaveQuota: user.yearlyLeaveQuota } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Leave Routes (protected)
app.get('/leaves', authenticateToken, async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.user.sub }).sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/leaves', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate, days, type, reason } = req.body;
    
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31);
    
    const takenLeaves = await Leave.find({
      userId: req.user.sub,
      startDate: { $gte: startOfYear, $lte: endOfYear },
      type: 'paid'
    });
    
    const takenDays = takenLeaves.reduce((total, leave) => total + leave.days, 0);
    const currentMonth = new Date().getMonth() + 1;
    const accruedDays = Math.min(currentMonth * 1.5, 18);
    
    if (type === 'paid' && takenDays + days > accruedDays) {
      return res.status(400).json({ message: 'Insufficient leave balance' });
    }
    
    const leave = new Leave({
      userId: req.user.sub,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      days,
      type,
      reason,
    });
    
    await leave.save();
    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/leaves/summary', authenticateToken, async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31);
    
    const user = await User.findById(req.user.sub);
    const currentMonth = new Date().getMonth() + 1;
    const accrued = Math.min(currentMonth * 1.5, user.yearlyLeaveQuota);
    
    const takenLeaves = await Leave.find({
      userId: req.user.sub,
      startDate: { $gte: startOfYear, $lte: endOfYear },
      type: 'paid'
    });
    
    const taken = takenLeaves.reduce((total, leave) => total + leave.days, 0);
    const remaining = Math.max(0, accrued - taken);
    
    res.json({
      yearlyQuota: user.yearlyLeaveQuota,
      accrued,
      taken,
      remaining,
      currentMonth,
      currentYear,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/leaves/:id', authenticateToken, async (req, res) => {
  try {
    const leave = await Leave.findOneAndDelete({ _id: req.params.id, userId: req.user.sub });
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }
    res.json({ message: 'Leave deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = app;
