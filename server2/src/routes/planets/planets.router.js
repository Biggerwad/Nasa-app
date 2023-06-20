const express = require('express');

// destructuring to get info from controller
const httpGetAllPlanets = require('./planets.controller');

// Calling the router
const planetsRouter = express.Router();

// activating a get request in this route 
planetsRouter.get('/', httpGetAllPlanets);

module.exports = planetsRouter;