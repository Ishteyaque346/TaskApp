import dotenv from 'dotenv';

dotenv.config();

export const getConfig = () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/task-app',
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS) || 10,
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173'
});