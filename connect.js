const mongoose = require('mongoose');

async function connectToMongoDB(url) {
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
}

module.exports = {
  connectToMongoDB,
};
