const http = require('node:http')

const app = require('./app.js')
const { loadPlanets } = require('./models/planets.model')

const PORT = process.env.PORT || 8000

async function startServer() {
  await loadPlanets()

  const server = http.createServer(app)
  server.listen(PORT, () => {
    console.log(`App running on PORT: ${PORT}`)
  })
}

startServer()
