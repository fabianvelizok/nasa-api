const {
  getAllLaunches,
  getAllLaunchesSortedByFlightNumber,
  addNewLaunch,
  isValidDate
} = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
  const { sortByFlightNumber } = req.query
  const launches = sortByFlightNumber
    ? getAllLaunchesSortedByFlightNumber()
    : getAllLaunches();

  return res.status(200).json(launches)
}

function httpAddNewLaunch(req, res) {
  const { mission, rocket, launchDate, target } = req.body

  if (!mission || !rocket || !launchDate || !target) {
    return res.status(400).json({ error: 'Missing required properties!' })
  }

  const parsedLaunchDate = new Date(launchDate)
  if (!isValidDate(parsedLaunchDate)) {
    return res.status(400).json({ error: 'Invalid launch date property!' })
  }
  const newLaunch = addNewLaunch({ ...req.body, launchDate: parsedLaunchDate })
  return res.status(201).json(newLaunch)
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch
}