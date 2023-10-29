const Launch = require('./launches.mongo')
const Planet = require('./planets.mongo')

const DEFAULT_FLIGHT_NUMBER = 99

async function getAllLaunches() {
  return await Launch.find({}, { __v: 0, _id: 0 })
}

async function getAllLaunchesSortedByFlightNumber() {
  return await Launch
    .find({}, { __v: 0, _id: 0 })
    .sort('flightNumber')
}

async function getLatestFlightNumber() {
  const latestLaunch = await Launch
    .findOne({})
    .sort('-flightNumber')

  return latestLaunch?.flightNumber || DEFAULT_FLIGHT_NUMBER
}

function isValidDate(parsedDate) {
  if (!parsedDate) {
    return false
  }
  return !isNaN(parsedDate.valueOf())
}

async function saveLaunch(launch) {
  const planet = await Planet.findOne({ keplerName: launch.target })

  if (!planet) {
    throw new Error('No matching planet found') 
  }

  const newLaunch = await Launch.findOneAndUpdate({
    flightNumber: launch.flightNumber
  }, launch, {
    upsert: true,
    new: true,
    select: { __v: 0, _id: 0 }
  })

  return newLaunch
}

async function addNewLaunch(launch) {
  const { mission, rocket, launchDate, target } = launch
  const flightNumber = await getLatestFlightNumber() + 1

  return await saveLaunch({
    mission,
    rocket,
    launchDate,
    target,
    flightNumber,
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
  })
}

async function existsLaunchWithID(flightNumber) {
  return await Launch.exists({ flightNumber })
}

async function abortLaunchByID(flightNumber) {
  const aborted = await Launch.findOneAndUpdate({
    flightNumber 
  }, {
    upcoming: false,
    success: false
  }, {
    new: true,
    select: { __v: 0, _id: 0 }
  })

  return aborted
}

module.exports = {
  getAllLaunches,
  getAllLaunchesSortedByFlightNumber,
  addNewLaunch,
  isValidDate,
  existsLaunchWithID,
  abortLaunchByID
}