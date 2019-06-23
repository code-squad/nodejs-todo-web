const request   = require('supertest');
const server    = require('./server');

describe('Test the root path', () => {
    // test('POST 메소드 테스트', (done) => {
    //     request(server)
    //     .post('/SignIn.html')
    //     .then((response) => {
    //         expect(response.statusCode).toEqual(200);
    //         done();
    //     });
    // });
    test('POST 회원가입 테스트', (done) => {
        request(server)
        .post('/signUpCheck')
        .send('id=hyodol1225&pw=1234')
        .then((response) => {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });
    test('POST 로그인 테스트', (done) => {
        request(server)
        .post('/signInCheck')
        .send('id=test1&pw=1234')
        .then((response) => {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });
    test('POST 로그인 테스트', (done) => {
        request(server)
        .post('/signInCheck')
        .send('id=test&pw=1234')
        .then((response) => {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });
    test('POST 로그인 테스트', (done) => {
        request(server)
        .post('/signInCheck')
        .send('id=test1123&pw=1234')
        .then((response) => {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });
    test('POST 로그인 테스트', (done) => {
        request(server)
        .post('/signInCheck')
        .send('id=h1&pw=1234')
        .then((response) => {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });
    test('POST 로그인 테스트', (done) => {
        request(server)
        .post('/signInCheck')
        .send('id=test2&pw=1234')
        .then((response) => {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });
    test('POST 로그인 테스트', (done) => {
        request(server)
        .post('/signInCheck')
        .send('id=hyo&pw=1234')
        .then((response) => {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });
});