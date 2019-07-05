const request = require('supertest');
const http = require('http');
const assert = require('assert');
const fs = require('fs');
const cookie = require('cookie');
const UserManager = require('../user_manager.js');
const Session = require('../session.js');
const Controller = require('../app/controller.js');
const userManager = new UserManager(fs);
const session = new Session();
const httpStatusCode = {
    'OK': 200,
    'MOVED PERMANENTLY': 301,
    'FOUND': 302,
    'NOT FOUND': 404,
    'CONFLICT': 409,
    'INTERNAL SERER ERROR': 500
}
const controller = new Controller(httpStatusCode, fs, session, cookie, userManager);
const server = http.createServer(async (request, response) => {
    try {
        controller.app(request, response);
    } catch (err) {
        const status = 'INTERNAL SERVER ERROR';
        controller.error(request, response, status);

    }
});
const agent = request.agent(server);
let sessionID = '';
const userData = { "id": "wangman", "data": [["todo", "go home"], ["doing"], ["done"]] };
const sendingUserData = { "id": "wangman", "userData": [["todo", "go home"], ["doing"], ["done"]], "test": "test" };

const [userID, userPW, fakeID, fakePW, newID] = ['wangman', '1234', 'wongman', '1234', 'wangmin'];


describe('# Server test', () => {
    it('get /login without session', done => {
        agent.get('/')
            .expect(200)
            .end((err, response) => {
                if (err) throw done(err);
                done();
            });
    });

    it('try login with incorrect user', done => {
        agent.post('/login')
            .send({ id: fakeID, pw: fakePW, test: 'test' })
            .set('Accept', 'application/json')
            .expect(409)
            .end((err, response) => {
                if (err) throw done(err);
                done();
            });
    });

    it('try login with correct user', done => {
        agent.post('/login')
            .send({ id: userID, pw: userPW, test: 'test' })
            .set('Accept', 'application/json')
            .expect(302)
            .end((err, response) => {
                if (err) throw done(err);
                assert.equal(response.text, "Logged in");
                sessionID = response.header['set-cookie'][0].split(' ')[2];
                done();
            });
    });


    it('try logout', done => {
        agent.post('/index/logout')
            .expect(302)
            .end((err, response) => {
                if (err) throw done(err);
                assert.equal(response.header['set-cookie'][0].split(' ')[2], '');
                done();
            });
    });



    it('get /login with session', done => {
        agent.get('/')
            .set('Accept', 'application/json')
            .set('cookie', `sessionID=${sessionID}`)
            .expect(302)
            .end((err, response) => {
                if (err) throw done(err);
                assert.equal(response.header.location, './index');
                done();
            });
    });

    it('try signup with exist user', done => {
        agent.post('/signup')
            .send({ id: userID, pw: fakePW, test: 'test' })
            .set('Accept', 'application/json')
            .expect(409)
            .end((err, response) => {
                if (err) throw done(err);
                done();
            });
    });

    it('try signup', done => {
        agent.post('/signup')
            .send({ id: newID, pw: userPW, test: 'test' })
            .set('Accept', 'application/json')
            .expect(302)
            .end((err, response) => {
                if (err) throw done(err);
                assert.equal(response.header.location, './index');
                assert.equal(response.text, "Sign Up");
                done();
            });
    });

    it('get /login with incorrect session', done => {
        agent.get('/')
            .set('Accept', 'application/json')
            .set('cookie', `sessionID=1234`)
            .expect(200)
            .end((err, response) => {
                if (err) throw done(err);
                done();
            });
    });

    it('get /index without session', done => {
        agent.get('/index')
            .expect(302)
            .set('Accept', 'application/json')
            .set('cookie', `sessionID= `)
            .end((err, response) => {
                if (err) throw done(err);
                assert.equal(response.header.location, './login');
                assert.equal(response.header['set-cookie'][0].split(' ')[2], '');
                done();
            });
    });

    it('get /index with incorrect session', done => {
        agent.get('/index')
            .expect(302)
            .set('Accept', 'application/json')
            .set('cookie', `sessionID=1234`)
            .end((err, response) => {
                if (err) throw done(err);
                done();
            });
    });

    it('get /index with correct session', done => {
        agent.get('/index')
            .expect(200)
            .set('Accept', 'application/json')
            .set('cookie', `sessionID=${sessionID}`)
            .end((err, response) => {
                if (err) throw done(err);
                done();
            });
    });

    it('put /index/saveData', done => {
        agent.put('/index/saveData')
            .expect(200)
            .send(sendingUserData)
            .set('Accept', 'application/json')
            .set('cookie', `sessionID=${sessionID}`)
            .end((err, response) => {
                if (err) throw done(err);
                done();
            });
    });


    it('get /index/userData with correct session', done => {
        agent.get('/index/userData')
            .expect(200)
            .set('Accept', 'application/json')
            .set('cookie', `sessionID=${sessionID}`)
            .end((err, response) => {
                if (err) throw done(err);
                assert.equal(response.text, JSON.stringify(userData));
                done();
            });
    });

    it('get /index/userData with incorrect session', done => {
        agent.get('/index/userData')
            .expect(302)
            .set('Accept', 'application/json')
            .set('cookie', `sessionID=1234`)
            .end((err, response) => {
                if (err) throw done(err);
                assert.equal(response.header['set-cookie'][0].split(' ')[2], '');
                done();
            });
    });

    it('get /index/userData withouth session', done => {
        agent.get('/index/userData')
            .expect(302)
            .set('Accept', 'application/json')
            .set('cookie', `sessionID=`)
            .end((err, response) => {
                if (err) throw done(err);
                done();
            });
    });
});
