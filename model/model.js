const fs = require('fs');


class UsersManager {

    openRegister() {
        return new Promise((resolve, reject) => {
            fs.readFile('db/users.json', (err, data) => {
                if (err) throw err;
                resolve(data);
            })
        })
    }


    canIUseIt() {
        return async (req, res, next) => {
            const { id } = req.body;
            try {
                const data = await this.openRegister();
                const users = JSON.parse(data.toString());
                if (users[id]) {
                    res.end('exit')
                } else {
                    res.end('Not exit')
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    createAccount(jsonFile) {
        return new Promise((resolve, reject) => {
            fs.writeFile('db/users.json', jsonFile, (err) => {
                if (err) throw err;
                resolve('Created account. Enjoy Todo List!');
            })
        })
    }

    createID() {
        return async (req, res, next) => {
            const { id, pwd } = req.body;
            try {
                const data = await this.openRegister();
                const users = JSON.parse(data.toString());
                users[id] = pwd;
                const jsonFile = JSON.stringify(users);
                const note = await this.createAccount(jsonFile);
                res.end(note);
            } catch (err) {
                console.log(err);
            }
        }
    }
}


module.exports = new UsersManager();