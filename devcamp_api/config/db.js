import mongoose from 'mongoose';

export const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  });

  console.log(
    `MongoDB connected on ${conn.connection.host}`.cyan.underline.bold
  );
};
