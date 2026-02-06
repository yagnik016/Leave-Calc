# Leave Management System

A comprehensive Leave Management & Leave Calculator web application built with Next.js (frontend) and NestJS (backend) with MongoDB database.

## Features

- **User Authentication**: Secure JWT-based registration and login system
- **Leave Tracking**: Create, view, and delete leave requests
- **Automatic Calculations**: Monthly leave accrual (1.5 days/month) with yearly quota of 18 days
- **Real-time Balance**: Track accrued, taken, and remaining leave days
- **Leave Types**: Support for Paid, Unpaid, and Sick leave
- **Modern UI**: Clean, responsive interface built with Tailwind CSS
- **Calendar Year Based**: Leave calculations reset every January 1st

## Tech Stack

### Backend (NestJS)
- **Framework**: NestJS with TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with Passport
- **Validation**: Class-validator and class-transformer
- **Password Hashing**: bcrypt

### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Date Handling**: date-fns
- **Icons**: Lucide React

## Project Structure

```
Leave Calc/
├── BE/                 # NestJS Backend
│   ├── src/
│   │   ├── auth/       # Authentication module
│   │   ├── users/      # User management
│   │   ├── leave/      # Leave management
│   │   └── app.module.ts
│   ├── .env.example
│   └── package.json
└── frontend/           # Next.js Frontend
    ├── src/
    │   ├── app/        # App Router pages
    │   ├── components/ # React components
    │   ├── lib/        # API and utilities
    │   └── types/      # TypeScript types
    ├── env.local.example
    └── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd BE
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/leave-management
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   PORT=3001
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the backend server**:
   ```bash
   npm run start:dev
   ```

   The backend will be running at `http://localhost:3001`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp env.local.example .env.local
   ```
   
   Edit `.env.local` if needed:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Start the frontend server**:
   ```bash
   npm run dev
   ```

   The frontend will be running at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Leave Management
- `GET /leaves` - Get all user leaves
- `POST /leaves` - Create new leave request
- `DELETE /leaves/:id` - Delete leave request
- `GET /leaves/summary` - Get leave summary (accrued, taken, remaining)
- `GET /leaves/month/:year/:month` - Get leaves for specific month

## Business Logic

### Leave Accrual System
- **Yearly Quota**: 18 paid leave days per calendar year
- **Monthly Accrual**: 1.5 days per month (18 ÷ 12)
- **Accrual Period**: January 1st to December 31st
- **Maximum Accrual**: Cannot exceed yearly quota
- **Partial Days**: Supports half-day leave requests (0.5 days)

### Leave Validation
- Prevents exceeding available leave balance for paid leave
- Validates date ranges and reason requirements
- Supports multiple leave types (Paid, Unpaid, Sick)

## Usage

1. **Register a new account** or login with existing credentials
2. **View your dashboard** showing leave summary and statistics
3. **Request leave** by filling out the leave form with dates, type, and reason
4. **Track your leave history** in the leave history table
5. **Monitor your balance** in real-time as leaves are approved

## Development

### Running Tests
```bash
# Backend
cd BE && npm test

# Frontend
cd frontend && npm test
```

### Building for Production
```bash
# Backend
cd BE && npm run build

# Frontend
cd frontend && npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Future Enhancements

- Admin dashboard for managing all users
- Leave approval workflow
- Carry-forward leave functionality
- Email notifications
- Calendar integration
- Mobile app
- Advanced reporting and analytics
- Team leave calendar
- Holiday management integration
