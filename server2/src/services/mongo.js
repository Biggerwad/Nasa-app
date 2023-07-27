const mongoose = require('mongoose');

require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

// Only be triggered once
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', () => {
    console.error(error);
});

async function mongoConnect() {
    // passing option into the mongodb drivers.
    await mongoose.connect(MONGO_URL);
}

// Disconnecting connection for the test
async function mongoDisconnect() {
    await mongoose.disconnect(MONGO_URL);

}

module.exports = {
    mongoConnect,
    mongoDisconnect
}