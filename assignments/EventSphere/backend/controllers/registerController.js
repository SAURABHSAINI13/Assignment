import Registration from '../models/Registration.js';

export const registerUserToEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;
    const registration = new Registration({ userId, eventId });
    await registration.save();
    res.status(201).json({ msg: 'Registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

import express from 'express';
import { signup, login } from '../controllers/authController.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;
