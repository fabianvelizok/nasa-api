const http = require('node:http')
const mongoose = require('mongoose');

const { PORT, DB_URL } = require('./constants')
const app = require('./app.js')
const { loadPlanets } = require('./models/planets.model')

mongoose.connection.on('open', () => {
  console.log('Connected to db')
})

mongoose.connection.on('error', err => {
  console.error('Error after initial connection. ', err)
})

async function startServer() {
  try {
    await mongoose.connect(DB_URL);
  } catch (e) {
    console.error('Error on initial connection to db. ', e)
  }

  await loadPlanets()

  const server = http.createServer(app)
  server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
  })
}

startServer()
