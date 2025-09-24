require("dotenv").config();
require(' ex')
const DATABASE_URL = process.env.DATABASE_URL;

const mongoose = require("mongoose");

async function dbConnect() {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Database connection successful.");
  } catch (err) {
    console.error("Database connection unsuccessful.", err);
  }
}

module.exports = dbConnect;









