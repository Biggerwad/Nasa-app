// Let's get started fam!
// We would be streaming a csv file and getting data from it using event emitter knowledge!

// What is streaming?
// This is the flow of data in the application

// importing the csv parser from npm to analyze the csv file in a particular order.
const { parse } = require('csv-parse');
const path = require('path');
const fs = require('fs')

const planets = require('./planets.mongo');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6
}

// This creates a readable stream that emits event
// Very similar to the celebrity emmitter under the event-emitter module
// This stream emits events we can listen to
// everytime data is read, it emits a data event and releases a piece of data.
function loadPlanetsData() {
    // Using pro,ises to know when the thing is successful or not.
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            // converting the csv file read to an array and returning it
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            // On emitting data, do this:
            .on('data', async (data) => {
                // If the data passes the habitable data test, do this:
                if (isHabitablePlanet(data)) {
                    // TODO: Replace below create with insert + update = upsert.
                    await setPlanets(data)
                }
            })
            // If err is emitted, do this:
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            // When the parser is done reading the stream, do this:
            .on('end', async () => {
                const countPlanetsFound = (await getAllPlanets()).length;
                // Only be sending it to API
                console.log(`There are ${countPlanetsFound} habitable Planets found`);
                resolve()
            });
    })
}

async function getAllPlanets() {
    return await planets.find({});
}
async function setPlanets(planet) {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name,
        }, {
            keplerName: planet.kepler_name,
        }, {
            upsert: true,
        });
    } catch (err) {
        console.log(`error: ${err}`)
    }
}
module.exports = {
    // Exporting the function to be used when we start our server
    loadPlanetsData,
    // Every conditional has been summed up in the function above, just export the result
    getAllPlanets,
}