const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');
const { error } = require('console');

const PORT = process.env.PORT || 8000;

const MONGO_URL = "mongodb://localhost:27017/NASA";
const server = http.createServer(app);

// Only be triggered once
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', () => {
    console.error(err);
});

// in common js, you can't call await at the beginning of the funtion, so put in an async function
async function startServer() {
    // passing option into the mongodb drivers.
    await mongoose.connect(MONGO_URL);

    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
}
// Don't await, because we dont want anything again.
startServer();