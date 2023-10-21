const { getAllLaunches, getAllLaunchesSortedByFlightNumber } = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
  const { sortByFlightNumber } = req.query
  const launches = sortByFlightNumber
    ? getAllLaunchesSortedByFlightNumber()
    : getAllLaunches();

  return res.status(200).json(launches)
}

module.exports = {
  httpGetAllLaunches
}