const mongoose = require('mongoose'); // Defined mongoose constant to access mongoose class and functions

// Function to connect and log or Errors in DB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error('Database Connection Failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB; // Exporter to make function Globally accessible in the Project