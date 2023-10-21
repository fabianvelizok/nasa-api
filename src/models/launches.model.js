const launches = new Map()
let latestFlightNumber = 100

const launch = {
  mission: 'Kepler exploration',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  flightNumber: latestFlightNumber++,
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true
}
const launch2 = {
  mission: 'Kepler exploration 2',
  rocket: 'Explorer IS2',
  launchDate: new Date('December 29, 2031'),
  target: 'Kepler-442 b',
  flightNumber: latestFlightNumber++,
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true
}

launches.set(launch2.flightNumber, launch2)
launches.set(launch.flightNumber, launch)

function getAllLaunches() {
  return Array.from(launches.values())
}

function getAllLaunchesSortedByFlightNumber() {
  const launches = getAllLaunches()
  return launches.sort((a, b) => a.flightNumber - b.flightNumber)
}

function isValidDate(parsedDate) {
  if (!parsedDate) {
    return false
  }
  return !isNaN(parsedDate.valueOf())
}

function addNewLaunch(launch) {
  const { mission, rocket, launchDate, target } = launch
  const currentFlightNumber = latestFlightNumber++

  launches.set(currentFlightNumber, {
    mission,
    rocket,
    launchDate,
    target,
    flightNumber: currentFlightNumber,
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
  })

  return launches.get(currentFlightNumber)
}

function existsLaunchWithID(id) {
  return launches.has(id)
}

function abortLaunchByID(id) {
  const aborted = launches.get(id)
  aborted.upcoming = false
  aborted.success = false
  return aborted
}

module.exports = {
  launches,
  getAllLaunches,
  getAllLaunchesSortedByFlightNumber,
  addNewLaunch,
  isValidDate,
  existsLaunchWithID,
  abortLaunchByID
}