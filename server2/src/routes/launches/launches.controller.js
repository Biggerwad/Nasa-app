const {
    addNewLaunch,
    getAllLaunches,
    existingLaunchId,
    abortLaunchById,
} = require('../../models/launches.model');
// const { getAllLaunches } = require('./launches.router');

function httpGetAllLaunches(req, res) {
    // Turning the object into array
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunches(req, res) {
    const launch = req.body;

    if (!launch.mission || !launch.rocket ||
        !launch.launchDate || !launch.target) {
        res.status(400).json({
            error: 'MISSING REQUIRED LAUNCH PROPERTY',
        });
    }
    launch.launchDate = new Date(launch.launchDate);
    // Making sure the date is a number 
    if (isNaN(launch.launchDate)) {
        res.status(400).json({
            error: 'MISSING DATE FORMAT',
        });
    }

    addNewLaunch(launch);
    res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);

    // If the right id is sent from the router, do this
    if (!existingLaunchId) {
        return res.status(404).json({
            error: "Missing required property"
        })
    }
    // if not do this
    const aborted = abortLaunchById(launchId);
    res.status(200).json(aborted);
}

module.exports = {
    httpAddNewLaunches,
    httpGetAllLaunches,
    httpAbortLaunch,
}