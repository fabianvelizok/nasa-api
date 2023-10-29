const http = require('node:http')

const { PORT } = require('./constants')
const app = require('./app.js')
const { loadPlanets } = require('./models/planets.model')
const { mongoConnect } = require('./services/mongo');

async function startServer() {
  await mongoConnect()
  await loadPlanets()

  const server = http.createServer(app)
  server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
  })
}

startServer()
