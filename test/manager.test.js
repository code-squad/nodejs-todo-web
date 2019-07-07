const SessionManager = require('../manager/session_manager');
const utilCookies    = require('../util/cookie_parser');
const sessionManager = new SessionManager(utilCookies);

describe('Manager 객체 테스트', () => {
    test('Session isValid() 테스트 1', (done) => {
        expect(sessionManager.isValid(undefined)).toEqual(false);
        done();
    });

    test('Session isValid() 테스트 2', (done) => {
        const cookie = 'SID=5933636578140495; Max-Age=2592000; HttpOnly';
        const initMS = new Date().getTime() - 19e5;
        const initTime = new Date(initMS);
        const value = { id : 'testID', date : initTime }; 
        sessionManager.sessionTable.set('5933636578140495', JSON.stringify(value));
        expect(sessionManager.isValid(cookie)).toEqual(false);
        done();
    });
});