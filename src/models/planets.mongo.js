const { Schema, model } = require('mongoose');

const planetSchema = new Schema({
  keplerName: {
    type: String,
    required: true
  }
})

const Planet = model('Planet', planetSchema)

module.exports = Planet