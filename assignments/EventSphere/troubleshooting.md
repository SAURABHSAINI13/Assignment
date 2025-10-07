# EventSphere Application Troubleshooting Guide

## Network Error: "API server might be down" / "net::ERR_CONNECTION_REFUSED http://localhost:5000/api/events"

### Problem
The frontend application cannot connect to the backend API server running on http://localhost:5000.

### Solution Steps

#### 1. Check if MongoDB is installed and running

```bash
# Check MongoDB installation
mongod --version

# Start MongoDB service (Windows)
net start MongoDB

# If MongoDB is not installed, install it from https://www.mongodb.com/try/download/community
```

#### 2. Start the backend server

```bash
# Navigate to the backend directory
cd backend

# Install dependencies if not already installed
npm install

# Start the server
npm start
```

#### 3. Verify the .env configuration
Make sure your backend/.env file contains the correct MongoDB connection string:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/eventsphere
JWT_SECRET=your_jwt_secret
```

#### 4. Check for MongoDB connection errors
If the backend server starts but shows MongoDB connection errors, ensure:
- MongoDB service is running
- The connection string in .env is correct
- MongoDB is listening on the default port (27017)

#### 5. Start the frontend application

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies if not already installed
npm install

# Start the development server
npm run dev
```

#### 6. Alternative MongoDB Connection
If you're still having issues connecting to a local MongoDB instance, consider using MongoDB Atlas:

1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string and update your .env file:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/eventsphere
```

#### 7. Check for port conflicts
Ensure no other application is using port 5000. You can change the port in the .env file if needed.