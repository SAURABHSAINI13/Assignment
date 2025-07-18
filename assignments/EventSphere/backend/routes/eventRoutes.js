import express from 'express';
import { createEvent, getAllEvents, getEventById } from '../controllers/eventController.js';
const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', createEvent);

export default router;