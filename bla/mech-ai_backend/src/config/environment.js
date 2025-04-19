import dotenv from 'dotenv';



dotenv.config();

export const environment = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/mechai',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN
};