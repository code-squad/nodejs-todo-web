const request   = require('supertest');
const stateCode = require('./state_code');
const server    = require('./server');

describe('Test the root path', () => {
    test('It should response the GET method', (done) => {
        request(server).get('/').then((response) => {
            expect(response.stateCode).toBe(stateCode['OK']);
            done();
        });
    });
});