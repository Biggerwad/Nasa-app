// const launches = require('./launches.mongo');

const launches = new Map();

function existingLaunchId(launchId) {
    return launches.has(launchId);
}

let latestFlightNumber = 100;
// implementing ht javascript map co
const launch = {
    flightNumber: 100,
    mission: 'kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'kepler-442 b',
    customers: ['KASON', 'NASA'],
    upcoming: true,
    success: true,
}

// Passing in key and value.
// Making the key of this object to be the flightNumber!
launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values());
}
// Get new launches
function addNewLaunch(launch) {
    latestFlightNumber += 1;
    // Making the key of this object to be the flightNumber!
    launches.set(latestFlightNumber, Object.assign(launch, {
        customers: ['KASON', 'NASA'],
        success: true,
        upcoming: true,
        flightNumber: latestFlightNumber
    }))
}

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    existingLaunchId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
    // launches,
}