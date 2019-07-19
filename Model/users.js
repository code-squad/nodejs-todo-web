const fs = require('fs');
const path = require('path');

class Users {
    constructor() {
        this.filePath = path.join(__dirname, '../filedb/users.json');
        fs.readFile(this.filePath, (err, data) => {
            if (err) throw err;
            this.userList = JSON.parse(data);
        });
    }

    isValidUser(userInput) {
        for (let key of Object.keys(this.userList)) {
            let user = this.userList[key];
            if ((user.id === userInput.id) && (user.password === userInput.pw)) 
                return true;
        }
        return false;
    }

    checkId(newUser) {
        for (let key of Object.keys(this.userList)) {
            let user = this.userList[key];
            if (user.id === newUser.id) return false;
        }
        return true;
    }

    appendNewUser(user) {
        fs.readFile(this.filePath, (err, data) => {
            if (err) throw err;
            let json = JSON.parse(data);
            json[user.id] = user;
            fs.writeFile(this.filePath, JSON.stringify(json, null, 4), 'utf8', err => {
                if (err) console.log(err);
                console.log('새로운 유저가 저장되었습니다');
            });
        });
    }
    
    signUp(newUser) {
        if (this.checkId(newUser)) {
            const user = {
                id: newUser.id,
                password: newUser.pw
            }
            this.appendNewUser(user);
        }
    }

}

module.exports = Users;