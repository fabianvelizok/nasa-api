const http = require('node:http')

require('dotenv').config()
const { PORT } = require('./constants')
const app = require('./app.js')
const { mongoConnect } = require('./services/mongo');
const { loadPlanets } = require('./models/planets.model')
const { loadLaunches } = require('./models/launches.model')

async function startServer() {
  await mongoConnect()
  await loadPlanets()
  await loadLaunches()

  const server = http.createServer(app)
  server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
  })
}

startServer()
