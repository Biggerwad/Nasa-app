const { getAllPlanets } = require('../../models/planets.model')

async function httpGetAllPlanets(req, res) {
    // Using return so the function stops executing and only returns the status code and DAta
    return res.status(200).json(await getAllPlanets())
}

module.exports = httpGetAllPlanets;