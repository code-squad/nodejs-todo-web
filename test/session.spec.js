const assert = require('assert');
const Session = require('../session.js');
const session = new Session();

class User{
    constructor(id,pw){
        this.id = id;
        this.pw = pw;
        this.data = {
            todo : [],
            doing : [],
            done : []
        }; 
    }
}

describe('# session test', () => {
    describe('# get SessionID test', () => {
        it('should return user session data that includes sessionID', () => {
            const sessionData =  session.getSessionID(new User('wangman', 1234));
            assert.equal('sessionID' in sessionData, true);
        });
        it('should includes id', () => {
            const sessionData =  session.getSessionID(new User('wangman', 1234));
            assert.equal(sessionData.id, 'wangman');
        });
        it('should includes data', () => {
            const sessionData =  session.getSessionID(new User('wangman', 1234));
            assert.equal(JSON.stringify(sessionData.data), JSON.stringify({todo : [],doing:[],done:[]}));
        });
    });
    describe('# is valid session id test',() => {
        it('should return session data', () =>{
            const sessionData =  session.getSessionID(new User('wangman', 1234));
            assert.equal(JSON.stringify(session.isValidSessionID(sessionData.sessionID)) , JSON.stringify(sessionData ));
        });
        it('should return false', ()=>{
            assert.equal(session.isValidSessionID(1234),false);
        })
    })
});

