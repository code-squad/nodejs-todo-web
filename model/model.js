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

    createTodo(dataObj) {
        const jsonFile = JSON.stringify(dataObj);
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
                const note = await this.createAccount(jsonFile);
                await this.createTodo(dataObj);
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
        return this.util.session[cookies.session] ? this.util.session[cookies.session].id : undefined;
    }

    createSchedule() {
        return async (req, res, next) => {
            try {
                const { status, text } = req.body;
                const userID = this.getUserID(req);
                if (userID !== undefined) {
                    const dataObj = await this.openTodos();
                    dataObj[userID][status].push(text);
                    await this.createTodo(dataObj);
                }

                res.end();
            } catch (err) {
                console.log(err);
            }
        }
    }

    changeSchedule() {
        return async (req, res, next) => {
            try {
                const userID = this.getUserID(req);
                if (userID !== undefined) {
                    const dataObj = await this.openTodos();
                    dataObj[userID] = req.body;
                    await this.createTodo(dataObj);
                }

                res.end()
            } catch (err) {
                console.log(err);
            }
        }
    }

    deleteUserSession(req) {
        const cookies = this.util.parseCookies(req.headers.cookie);
        delete this.util.session[cookies.session];
    }

    logOut() {
        return async (req, res, next) => {
            this.deleteUserSession(req);
            res.writeHead(200, {
                'Set-Cookie': `session=; Expires=; HttpOnly; Path=/`,
            });
            res.end();
        }
    }

    updateSchedule() {
        return async (req, res, next) => {
            try {
                const userID = this.getUserID(req);
                if (userID !== undefined) {
                    const dataObj = await this.openTodos();
                    const { status, text, index } = req.body;
                    dataObj[userID][status][index] = text;
                    await this.createTodo(dataObj);
                }

                res.end()
            } catch (err) {
                console.log(err);
            }
        }
    }
}


module.exports = UsersManager;