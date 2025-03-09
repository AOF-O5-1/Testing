import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Adebanjo:6tR0NvTmKmMFvBwo@cluster05-13.p3mce.mongodb.net/?retryWrites=true&w=majority&appName=Cluster05-13';

const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected.');
    return mongoose.connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed.');
  }
};

export default db;
