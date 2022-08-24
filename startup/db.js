const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://fede:MqauvswiRo41IER5@sindaco.uatza.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB...'));
}