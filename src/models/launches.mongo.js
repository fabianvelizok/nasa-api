const { Schema, model } = require('mongoose')

const launchSchema = new Schema({
  flightNumber: {
    type: Number,
    required: true
  },
  launchDate: {
    type: Date,
    required: true
  },
  mission: {
    type: String,
    required: true
  },
  rocket: {
    type: String,
    required: true
  },
  target: {
    type: String
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true
  },
  success: {
    type: Boolean,
    required: true
  }
})

// Connects launchSchema with the 'launches' collection
const Launch = model('Launch', launchSchema)

module.exports = Launch