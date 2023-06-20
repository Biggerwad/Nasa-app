// require super test in the test file
const request = require('supertest')

// require the application
const app = require('../../app');

// describing get request
describe('Test GET /launches', () => {
    test('It should return status = 200', async () => {
        // Passing the app into the request function
        // Inserting assertions
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200)
    });
});


// Creating test for Post request
describe('Test POST /launches', () => {
    const completeLaunchData = {
        mission: 'KSS Exchange',
        rocket: 'KSC 190 IR',
        target: 'Moon',
        launchDate: 'January 4, 2023',
    }

    const launchDataWithoutDate = {
        mission: 'KSS Exchange',
        rocket: 'KSC 190 IR',
        target: 'Moon',
    }
    const launchDataWithInvalidDate = {
        mission: 'KSS Exchange',
        rocket: 'KSC 190 IR',
        target: 'Moon',
        launchDate: 'Adebayo Jackson Day',
    }

    test('Return status of 201', async () => {
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201)

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();

        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test('Catch missing required props', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'MISSING REQUIRED LAUNCH PROPERTY',
        })
    });

    test('It should catch Invalid dates', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'MISSING DATE FORMAT',
        })
    });
})