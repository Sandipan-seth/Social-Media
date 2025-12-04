import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export default async function connect() {
  try {
    const db = await mongoose.connect(MONGODB_URI!);
    mongoose.connection.on("connected", () => {
      console.log("🟢 Mongoose connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("🔴 Mongoose error:", err);
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}
