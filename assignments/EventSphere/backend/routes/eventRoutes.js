import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {
  createEvent,
  getAllEvents,
  getEventById
} from '../controllers/eventController.js';

dotenv.config();

const router = express.Router();

// Connect only here (for events)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected for events route"))
  .catch(err => console.error("❌ Events DB connection error:", err));

// Event Routes
router.post('/', createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);

export default router;
