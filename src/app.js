const express = require('express')
const path = require('node:path')
const cors = require('cors')
const morgan = require('morgan')

const { CLIENT_URL } = require('./constants')
const planetsRouter = require('./routes/planets/planets.router')
const launchesRouter = require('./routes/launches/launches.router')

const app = express()

app.use(cors({ origin: CLIENT_URL }))
app.use(morgan('combined'))
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/planets', planetsRouter)
app.use('/launches', launchesRouter)
app.get('/*', (req, res) => {
  const indexFile = path.join(__dirname, '..', 'public', 'index.html')
  res.sendFile(indexFile)
})

module.exports = app