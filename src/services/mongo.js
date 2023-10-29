const mongoose = require('mongoose')

const { DB_URL } = require('../constants')

mongoose.connection.on('open', () => {
    console.log('Connected to db')
})

mongoose.connection.on('error', err => {
    console.error('Error after initial connection. ', err)
})

async function mongoConnect() {
  try {
    await mongoose.connect(DB_URL);
  } catch (e) {
    console.error('Error on initial connection to db. ', e)
  }
}

async function mongoDisconnect() {
  await mongoose.disconnect()
}

module.exports = {
  mongoConnect,
  mongoDisconnect
}