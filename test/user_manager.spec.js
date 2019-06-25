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
        it('should return user data object', () => {
            assert.equal(JSON.stringify(userManager.signUp('wangmin', 1234)), JSON.stringify(new User('wangmin', 1234)))
        });
    });
});

