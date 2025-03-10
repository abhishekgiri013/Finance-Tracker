import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.log("Already connected to the database.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "test", // Replace with actual DB name
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Database connection failed");
  }
};
