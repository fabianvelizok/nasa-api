const axios = require('axios')

const Launch = require('./launches.mongo')
const Planet = require('./planets.mongo')
const { SPACEX_API_URL } = require('../constants')

const DEFAULT_FLIGHT_NUMBER = 99

function handleLaunchesError(error) {
  const errorTitle =  'Error downloading launches'
  console.error(errorTitle, error)
}

async function populateLaunches() {
  try {
    const response = await axios({
      url: `${SPACEX_API_URL}/launches/query`,
      method: 'post',
      data: {
        query: {},
        options: {
          pagination: false,
          populate: [
            {
              path: 'rocket',
              select: { name: 1 }
            },
            {
              path: 'payloads',
              select: { customers: 1 }
            }
          ]
        }
      }
    })

    if (response.status !== 200) {
      handleLaunchesError()
    }

    for (const launchDoc of response.data.docs) {
      const launch = {
        mission: launchDoc.name,
        rocket: launchDoc.rocket.name,
        launchDate: launchDoc.date_local,
        target: '', // No matching prop
        flightNumber: launchDoc.flight_number,
        customers: launchDoc.payloads.flatMap(p => p.customers),
        upcoming: launchDoc.upcoming,
        success: launchDoc.success
      }
      console.log(`Saving launch with flightNumber: ${launch.flightNumber} and mission: ${launch.mission}`)

      await saveLaunch(launch)
    }
  } catch (e) {
    handleLaunchesError(e)
  }
}

async function loadLaunches() {
  const firstLaunch = await findLaunch({ flightNumber: 1 })
  if (firstLaunch) {
    return console.log('Launches already saved')
  }
  return await populateLaunches()
}

async function findLaunch(filter) {
  return await Launch.findOne(filter)
}

async function getAllLaunches(limit, skip) {
  return await Launch
    .find({}, { __v: 0, _id: 0 })
    .sort('flightNumber')
    .skip(skip)
    .limit(limit)
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
  const planet = await Planet.findOne({ keplerName: target })

  if (!planet) {
    throw new Error('No matching planet found')
  }
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
  addNewLaunch,
  isValidDate,
  existsLaunchWithID,
  abortLaunchByID,
  loadLaunches
}