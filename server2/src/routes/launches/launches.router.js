const express = require('express');
const {
    httpGetAllLaunches,
    httpAddNewLaunches,
    httpAbortLaunch,
} = require('./launches.controller');

// const getLaunches = 
const app = express();

const launchRouter = express.Router();

launchRouter.get('/', httpGetAllLaunches);
launchRouter.post('/', httpAddNewLaunches);
launchRouter.delete('/:id', httpAbortLaunch);

module.exports = launchRouter;