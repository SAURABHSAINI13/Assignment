import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  organizer: String,
  capacity: Number,
  price: { type: Number, default: 0 },
  ticketsAvailable: { type: Number, default: 0 },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  hasSeating: { type: Boolean, default: false },
  seatingCapacity: { type: Number, default: 0 },
  availableSeats: { type: [String], default: [] },
  reservedSeats: { type: [String], default: [] }
});

export default mongoose.model('Event', eventSchema);
