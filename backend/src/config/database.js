import mongoose from 'mongoose';
import { getConfig } from './environment.js';

const config = getConfig();

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(' MongoDB connection failed:', error.message);
    throw error;
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
};