import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Event from './models/Event.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Event.deleteMany();
    const data = JSON.parse(fs.readFileSync('./data/events.json', 'utf-8'));
    await Event.insertMany(data);

    console.log('✅ Events seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedData();
