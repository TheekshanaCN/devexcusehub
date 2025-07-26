import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = "excusehub";

if (!MONGODB_URI) throw new Error("Missing MONGODB_URI env variable");

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(MONGODB_URI, { dbName: DB_NAME });
};
