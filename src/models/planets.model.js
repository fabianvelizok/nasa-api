const { parse } = require('csv-parse')
const fs = require('node:fs')
const path = require('node:path')

const Planet = require('./planets.mongo')

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6
}

async function savePlanet(planet) {
  try {
    // upsert = insert + update
    await Planet.updateOne({
      keplerName: planet.kepler_name
    }, {
      keplerName: planet.kepler_name
    }, {
      upsert: true
    })
  } catch(e) {
    console.error('Error saving planet. ', e)
  }
}

function loadPlanets() {
  const filePath = path.join(__dirname, '..', '..', 'data', 'kepler_data.csv')
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(parse({
        comment: '#',
        columns: true
      }))
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          savePlanet(data)
        }
      })
      .on('end', async () => {
        const planets = await Planet.find({})
        resolve(planets)
      })
      .on('error', reject)
  })
}

async function getPlanets() {
  // Ignoring the __v and _id props
  return await Planet.find({}, { __v: 0, _id: 0 })
}

module.exports = {
  getPlanets,
  loadPlanets
}

