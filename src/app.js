const express = require('express')
const path = require('node:path')
const cors = require('cors')
const morgan = require('morgan')

const { CLIENT_URL } = require('./constants')
const api = require('./routes/api')

const app = express()

app.use(cors({ origin: CLIENT_URL }))
app.use(morgan('combined'))
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/v1', api)
app.get('/*', (req, res) => {
  const indexFile = path.join(__dirname, '..', 'public', 'index.html')
  res.sendFile(indexFile)
})

module.exports = app