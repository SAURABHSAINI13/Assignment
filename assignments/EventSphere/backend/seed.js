import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Event from './models/Event.js';

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);


const data = JSON.parse(fs.readFileSync('./data/events.json', 'utf-8'));

await Event.insertMany(data);
console.log('Events inserted!');
mongoose.disconnect();
