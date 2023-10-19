const express = require('express')
const cors = require('cors')

const planetsRouter = require('./routes/planets/planets.router')
const { CLIENT_URL } = require('./constants')

const app = express()

app.use(express.json())
app.use(cors({ origin: CLIENT_URL }))
app.use(planetsRouter)

module.exports = app