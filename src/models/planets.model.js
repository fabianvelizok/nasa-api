const { parse } = require('csv-parse');
const fs = require('node:fs')
const path = require('node:path')

const habitablePlanets = []

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6
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
          habitablePlanets.push(data)
        }
      })
      .on('end', () => {
        resolve(habitablePlanets)
      })
      .on('error', reject)
  })
}

module.exports = {
  planets: habitablePlanets,
  loadPlanets
}

