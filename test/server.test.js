const fs = require('fs');
const request = require('supertest');

let server;

describe('/', () => {
    beforeEach(() => { server = require('../server').server; });
    afterEach(() => { 
        server.close();
        fs.readFileSync
    });
    const [demoID, demoPassword, wrongPassword]  = ['demoID', 'demoPassword', 'wrongPassword'];
    const [demoItemName, demoStatus, updateStatus]  = ['demoItemName', 'todo', 'doing'];
    describe('Todo server test', () => {
        it('실행시 로그인 페이지 로드 확인', async done => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
            done();
        });

        it('중복되지 않는 아이디로 회원 가입 시도', async done => {
            const res = await request(server)
                .post('/members')
                .send({ 'id': demoID, 'password': demoPassword });
            expect(res.status).toBe(200);
            expect(res.text).toEqual('success');
            done();
        });

        it('중복 아이디로 회원 가입 시도', async done => {
            const res = await request(server)
                .post('/members')
                .send({ 'id': demoID, 'password': demoPassword });
            expect(res.status).toBe(200);
            expect(res.text).toEqual('fail');
            done();
        });

        it('틀린 정보로 로그인 시도', async done => {
            const res = await request(server)
                .post('/auth')
                .send({ 'id': demoID, 'password': wrongPassword });
            expect(res.status).toBe(200);
            expect(res.text).toEqual('fail');
            done();
        });

        it('맞는 정보로 로그인 시도', async done => {
            const res = await request(server)
                .post('/auth')
                .send({ 'id': demoID, 'password': demoPassword });
            expect(res.status).toBe(200);
            expect(res.text).toEqual('success');
            done();
        });

        it('사용자의 아이템 목록 가져오기', async done => {
            const session = Object.keys(require('../server').session)[0];
            const res = await request(server)
                .get('/items')
                .set('Cookie', `session=${session}`);
            expect(res.status).toBe(200);
            expect(res.text).toEqual('[]');
            done();
        });

        it('아이템 추가', async done => {
            const session = Object.keys(require('../server').session)[0];
            const res = await request(server)
                .post('/items')
                .set('Cookie', `session=${session}`)
                .send(JSON.stringify({"name":demoItemName, "status":demoStatus}));
            expect(res.status).toBe(200);
            done();
        });

        it('아이템 업데이트', async done => {
            const session = Object.keys(require('../server').session)[0];
            const itemsResponse = await request(server)
                .get('/items')
                .set('Cookie', `session=${session}`);
            const items = JSON.parse(itemsResponse.text);
            const res = await request(server)
                .patch(`/items`)
                .set('Cookie', `session=${session}`)
                .send({ "targetID":items[0].id, "siblingID":null, "status":updateStatus });
            expect(res.status).toBe(200);
            done();
        });

        it('아이템 삭제', async done => {
            const session = Object.keys(require('../server').session)[0];
            const itemsResponse = await request(server)
                .get('/items')
                .set('Cookie', `session=${session}`);
            const items = JSON.parse(itemsResponse.text);
            const res = await request(server)
                .delete(`/items?id=${items[0].id}`)
                .set('Cookie', `session=${session}`);
            expect(res.status).toBe(200);
            done();
        });

        it('로그아웃', async done => {
            const session = Object.keys(require('../server').session)[0];
            const res = await request(server)
                .delete(`/auth`)
                .set('Cookie', `session=${session}`);
            expect(res.status).toBe(200);
            done();
        });
    });
});