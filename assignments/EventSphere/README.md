# EventSphere

EventSphere is a comprehensive event management application that allows users to browse events, register for them, and manage their tickets.

## Features

- **Event Browsing**: View all upcoming events with details
- **User Registration**: Create an account to manage your event registrations
- **Event Registration**: Register for events with basic or premium options
- **Ticket Management**: View and manage your event tickets
- **Admin Dashboard**: Manage events, users, and registrations (admin only)

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- CSS for styling
- React-Toastify for notifications

### Backend
- Node.js with Express
- MongoDB for database
- Mongoose for object modeling
- JWT for authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Clone the repository
```
git clone <repository-url>
cd EventSphere
```

2. Install backend dependencies
```
cd backend
npm install
```

3. Set up environment variables
Create a `.env` file in the backend directory with the following:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/eventsphere
JWT_SECRET=your_jwt_secret
```

4. Install frontend dependencies
```
cd ../frontend
npm install
```

### Running the Application

1. Start the MongoDB service (if using local MongoDB)

2. Start the backend server
```
cd backend
npm start
```

3. Start the frontend development server
```
cd frontend
npm run dev
```

4. Access the application at `http://localhost:5173`

## Project Structure

```
EventSphere/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Request handlers
│   ├── data/           # Seed data
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   └── server.js       # Entry point
├── frontend/
│   ├── public/         # Static files
│   └── src/
│       ├── api/        # API service functions
│       ├── components/ # Reusable components
│       ├── context/    # React context providers
│       ├── pages/      # Page components
│       └── router/     # Routing configuration
```

## Troubleshooting

If you encounter any issues:

1. Ensure MongoDB is running
2. Check that the backend server is running on port 5000
3. Verify that your `.env` file is correctly configured
4. See the troubleshooting.md file for more detailed guidance

## License

This project is licensed under the MIT License.