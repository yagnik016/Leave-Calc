const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

async function checkUsers() {
  try {
    // Connect to MongoDB using the same URI as your app
    await mongoose.connect('mongodb+srv://hirenaavakar_db_user:My5KguvRXATKCQ57@cluster0.xmoapft.mongodb.net/leave-management');
    
    // Get the users collection
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');
    
    // Count all users
    const userCount = await usersCollection.countDocuments();
    console.log(`Total users in database: ${userCount}`);
    
    // Optionally, list all users (without passwords for security)
    const users = await usersCollection.find({}, { projection: { password: 0 } }).toArray();
    console.log('\nRegistered users:');
    users.forEach((user, index) => {
      console.log(`${index + 1}. Email: ${user.email}, Created: ${user.createdAt}, Yearly Quota: ${user.yearlyLeaveQuota}`);
    });
    
  } catch (error) {
    console.error('Error connecting to database:', error);
  } finally {
    await mongoose.disconnect();
  }
}

async function createTestUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://hirenaavakar_db_user:My5KguvRXATKCQ57@cluster0.xmoapft.mongodb.net/leave-management');
    
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');
    
    // Check if test user already exists
    const existingUser = await usersCollection.findOne({ email: 'test@example.com' });
    if (existingUser) {
      console.log('Test user already exists!');
      return;
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    // Create test user
    const testUser = {
      email: 'test@example.com',
      password: hashedPassword,
      yearlyLeaveQuota: 18,
      createdAt: new Date()
    };
    
    const result = await usersCollection.insertOne(testUser);
    console.log('Test user created successfully!');
    console.log('User ID:', result.insertedId);
    console.log('Email: test@example.com');
    console.log('Password: password123');
    
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Run the function you want
// checkUsers(); // Check existing users
createTestUser(); // Create a test user
