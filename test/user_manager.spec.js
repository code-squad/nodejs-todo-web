const assert = require('assert');
const UserManager = require('../user_manager.js');
const fs = require('fs');

const userManager = new UserManager(fs);

class User{
    constructor(id,pw){
        this.id = id;
        this.pw = pw;
        this.data = [['todo',],['doing'],['done']]; 
    }
}

describe('# user manager test', () => {
    describe('# sign up test', () => {
        it('should return user data', async () => {
            await userManager.createDataFile('test');
            const userData = await userManager.signUp('wangman', '1234','test');
            assert.equal(JSON.stringify(userData), JSON.stringify(new User('wangman', '1234')));
        });
        it('should return false', async () => {
            assert.equal(await userManager.signUp('wangman', '1234', 'test'), false)
        });
    });
    describe('# log in test',() => {
        it('should return user data', async () =>{
            const userData = await userManager.logIn('wangman','1234','test');
            const data = JSON.parse(fs.readFileSync('./data/testUserData.txt').toString());
            assert.equal(JSON.stringify(userData), JSON.stringify(data['wangman']) )
        });
        it('should return false', async ()=>{
            const userData = await userManager.logIn('wangman','123','test');
            assert.equal(userData,false);
        })
    })
});

