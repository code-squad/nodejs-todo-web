const assert = require('assert');
const UserManager = require('../user_manager.js');
const fs = require('fs');

const userManager = new UserManager(fs);

class User {
    constructor(id, pw) {
        this.id = id;
        this.pw = pw;
        this.data = {};
    }
}

describe('# user manager test', () => {
    describe('# sign up test', () => {
        it('should return user data', () => {
            userManager.createDataFile();
            const userData = userManager.signUp('wangman', 1234);
            assert.equal(JSON.stringify(userData), JSON.stringify(new User('wangman', 1234)));
        });
        it('should return false', () => {
            assert.equal(userManager.signUp('wangman', 1234), false)
        });
    });
    describe('# log in test',() => {
        it('should return user data', () =>{
            const userData = userManager.logIn('wangman',1234);
            const data = JSON.parse(fs.readFileSync('./data/userData.txt').toString());
            assert.equal(JSON.stringify(userData), JSON.stringify(data['wangman']) )
        });
        it('should return false', ()=>{
            const userData = userManager.logIn('wangman',123);
            assert.equal(userData,false);
        })
    })
});

