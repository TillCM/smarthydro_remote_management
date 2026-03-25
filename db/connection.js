require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("ENV:", process.env.MONGO_URI_HYDRO);
    await mongoose.connect(process.env.MONGO_URI_HYDRO);

    console.log("🟢 MongoDB Atlas connected");
  } catch (error) {
    console.error("🔴 DB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;