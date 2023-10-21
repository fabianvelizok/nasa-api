const launches = new Map()

const launch = {
  mission: 'Kepler exploration',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  destination: 'Kepler-442 b',
  flightNumber: 100,
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true
}
const launch2 = {
  mission: 'Kepler exploration 2',
  rocket: 'Explorer IS2',
  launchDate: new Date('December 29, 2031'),
  destination: 'Kepler-442 b',
  flightNumber: 101,
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true
}

launches.set(launch2.flightNumber, launch2)
launches.set(launch.flightNumber, launch)

module.exports = {
  launches
}