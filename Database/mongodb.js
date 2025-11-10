import mongoose from "mongoose";

import { DB_URI, NODE_ENV } from "../config/env.js";

// GUARD CLAUSE
if (!DB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.<development/production>.local"
  );
}

// connecting-monoose to our databa
export const connectToDataBase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(` Database connected in ${NODE_ENV} mode`);
  } catch (error) {
    console.error(" Database connection failed:", error.message);
    process.exit(1); 
  }
};
