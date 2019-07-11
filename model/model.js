const fs = require('fs');


class UsersManager {
    isFileExit(filePath) {
        return new Promise((resolve, reject) => {
            fs.access(filePath, (err) => {
                if (err) reject('notExit');
                resolve('exit');
            })
        });
    }

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

    createAccount(filePath, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, data, (err) => {
                if (err) reject('fail');
                resolve('Created account. Enjoy Todo List!');
            })
        });
    }

    createID() {
        return async (req, res, next) => {
            const { id, pwd } = req.body;
            const filePath = `users/${id}.json`
            const data = `{ "id": "${id}", "pwd": "${pwd}"}`
            try {
                const note = await this.createAccount(filePath, data);
                res.end(note);
            } catch (fail) {
                res.end(fail);
            }
        }
    }
}


module.exports = new UsersManager();