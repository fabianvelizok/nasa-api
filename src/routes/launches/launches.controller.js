const { launches } = require('../../models/launches.model')

function getAllLaunches(req, res) {
  const { sortByFlightNumber } = req.query
  let launchesArray = Array.from(launches.values())

  if (sortByFlightNumber) {
    launchesArray = launchesArray.sort((a, b) => a.flightNumber - b.flightNumber)
  }

  return res.status(200).json(launchesArray)
}

module.exports = {
  getAllLaunches
}