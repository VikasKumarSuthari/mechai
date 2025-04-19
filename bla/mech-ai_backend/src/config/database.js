import mongoose from 'mongoose';
import { environment } from './environment.js';

const connectDB = async () => {
  try {
    console.log(environment.MONGODB_URI);
    const conn = await mongoose.connect(environment.MONGODB_URI, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;