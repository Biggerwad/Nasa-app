const path = require('path');
// Bringing in the express codes
const express = require('express');
// Importing package for cross origin requests
const cors = require('cors');
const morgan = require('morgan')
// Importing planetsRouter
const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');

const app = express();
// Middleware for sending out json format data
// Handling chain of middlewares as they come into the application.

app.use(cors({
    origin: 'http://localhost:3000',
}));

// Impementing morgan logger picking format!
// This will only handle get requests
app.use(morgan('combined'))

app.use(express.json());

// Serving the application from API/ Express is doing the serving

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/launches', launchesRouter);
app.use('/planets', planetsRouter);
// Passing * to override other routes /*
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

module.exports = app;