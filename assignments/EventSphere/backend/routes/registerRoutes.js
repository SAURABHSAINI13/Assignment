import express from 'express';
import { registerUserToEvent } from '../controllers/registerController.js';
const router = express.Router();

router.post('/', registerUserToEvent);

export default router;