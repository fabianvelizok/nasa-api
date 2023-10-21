const express = require('express')
const path = require('node:path')
const cors = require('cors')
const morgan = require('morgan')

const planetsRouter = require('./routes/planets/planets.router')
const { CLIENT_URL } = require('./constants')

const app = express()

app.use(cors({ origin: CLIENT_URL }))
app.use(morgan('combined'))
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/', (req, res) => {
  const indexFile = path.join(__dirname, '..', 'public', 'index.html')
  res.sendFile(indexFile)
})
app.use(planetsRouter)

module.exports = app