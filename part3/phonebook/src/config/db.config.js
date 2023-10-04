const mongoose = require("mongoose");

const URI = process.env.DB_URI;

module.exports = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(URI);
    console.log("Connected to the database");
  } catch (error) {
    throw error;
  }
};
