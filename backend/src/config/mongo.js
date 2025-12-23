import mongoose from 'mongoose';

export default async function connectMongo() {
  if (!process.env.MONGO_URI) return;

  await mongoose.connect(process.env.MONGO_URI);
  console.log('🟢 MongoDB connected');
}
