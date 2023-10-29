const process = require('node:process')

const CLIENT_URL = 'http://localhost:3000'

const PORT = process.env.PORT || 8000

const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`

if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_URL) {
  console.error('Required environment variables were not provided!')
  process.exit(1)
}

module.exports = {
  CLIENT_URL,
  PORT,
  DB_URL
}
