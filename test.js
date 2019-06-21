const request   = require('supertest');
const server    = require('./server');

describe('Test the root path', () => {
    test('POST 메소드 테스트', (done) => {
        request(server)
        .get('localhost:8080')
        .then((response) => {
            expect(response.stateCode).toEqual(200);
            done();
        });
    });
});