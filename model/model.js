const fs = require('fs');

class UsersManager {

    constructor(util) {
        this.util = util
    }

    openRegister() {
        return new Promise((resolve, reject) => {
            fs.readFile('db/users.json', (err, data) => {
                if (err) throw err;
                resolve(data);
            })
        })
    }

    openTodos() {
        return new Promise((resolve, reject) => {
            fs.readFile('db/todos.json', (err, data) => {
                if (err) throw err;
                const dataObj = JSON.parse(data.toString());
                resolve(dataObj);
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
                resolve('create');
            })
        })
    }

    createTodo(jsonFile) {
        return new Promise((resolve, reject) => {
            fs.writeFile('db/todos.json', jsonFile, (err) => {
                if (err) throw err;
                resolve('create');
            })
        })
    }

    createID() {
        return async (req, res, next) => {
            const { id, pwd } = req.body;
            try {
                const data = await this.openRegister();
                const users = JSON.parse(data.toString());
                const dataObj = await this.openTodos();
                users[id] = pwd;
                dataObj[id] = {
                    "todo": [],
                    "doing": [],
                    "done": []
                }
                const jsonFile = JSON.stringify(users);
                const jsonFile2 = JSON.stringify(dataObj);
                const note = await this.createAccount(jsonFile);
                await this.createTodo(jsonFile2);
                res.end(note);
            } catch (err) {
                console.log(err);
            }
        }
    }

    login() {
        return async (req, res, next) => {
            const { id, pwd } = req.body;

            try {
                const data = await this.openRegister();
                const users = JSON.parse(data.toString());
                if (users[id] && users[id] === pwd) {
                    const { randomInt, expires } = this.util.makeSession(id);
                    res.writeHead(200, {
                        'Set-Cookie': `session=${randomInt}; Expires=${expires.toUTCString()}; HttpOnly; Path=/`,
                    });
                    res.end('success');
                } else {
                    res.end();
                }
            } catch (err) {
                throw err;
            }
        }
    }

    getUserID(req) {
        const cookies = this.util.parseCookies(req.headers.cookie);
        return this.util.session[cookies.session].id;
    }

    createSchedule() {
        return async (req, res, next) => {
            try {
                const { status, text } = req.body;
                const userID = this.getUserID(req);
                const dataObj = await this.openTodos();
                dataObj[userID][status].push(text);
                const jsonFile = JSON.stringify(dataObj);
                await this.createTodo(jsonFile);

                res.end();
            } catch (err) {
                console.log(err);
            }
        }
    }
}


module.exports = UsersManager;