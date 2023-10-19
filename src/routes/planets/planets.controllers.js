const planets = require('../../models/planets.model')

function getAllPlanets(req, res) {
  return res.set({ 'Access-Control-Allow-Origin': '*' }).status(200).json(planets)
}

module.exports = {
  getAllPlanets
}