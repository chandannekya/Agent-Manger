const mongoose = require("mongoose");

const databaseConnection = async () => {
  try {
    console.log(process.env.MONGO_URI);
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri, {
      // Return from connection attempts after 10s
    });
    console.log("Mongoose Connection State:", mongoose.connection.readyState);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error.message);
    process.exit(1);
  }
};

module.exports = databaseConnection;
