import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};
export default connectDB;
