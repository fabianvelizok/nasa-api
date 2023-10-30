const {
  getAllLaunches,
  addNewLaunch,
  isValidDate,
  existsLaunchWithID,
  abortLaunchByID
} = require('../../models/launches.model')
const { getPagination } = require('../../services/query')

async function httpGetAllLaunches(req, res) {
  const { limit, skip } = getPagination(req.query)
  const launches = await getAllLaunches(limit, skip);
  return res.status(200).json(launches)
}

async function httpAddNewLaunch(req, res) {
  const { mission, rocket, launchDate, target } = req.body

  if (!mission || !rocket || !launchDate || !target) {
    return res.status(400).json({ error: 'Missing required properties!' })
  }

  const parsedLaunchDate = new Date(launchDate)
  if (!isValidDate(parsedLaunchDate)) {
    return res.status(400).json({ error: 'Invalid launch date property!' })
  }

  try {
    const newLaunch = await addNewLaunch({ ...req.body, launchDate: parsedLaunchDate })
    return res.status(201).json(newLaunch)
  } catch (e) {
    console.log(e)
    return res.status(400).json({ error: 'Error creating new launch' })
  }
}

async function httpAbortLaunch(req, res) {
  const { id } = req.params
  const parsedID = Number(id)
  const exists = await existsLaunchWithID(parsedID)

  if (!exists) {
    res.status(404).json({ error: 'Launch not found!' })
  } else {
    const aborted = await abortLaunchByID(parsedID)
    res.status(200).json(aborted)
  }
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch
}