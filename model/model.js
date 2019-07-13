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
                const data2 = await this.openTodos();
                const todos = JSON.parse(data2.toString());
                users[id] = pwd;
                todos[id] = {
                    "todo": [],
                    "doing": [],
                    "done": []
                }
                const jsonFile = JSON.stringify(users);
                const jsonFile2 = JSON.stringify(todos);
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
                    const data = await this.openTodos();
                    const todos = JSON.parse(data.toString());
                    const userTodos = todos[id];
                    const str = JSON.stringify(userTodos);
                    res.end(str);
                } else {
                    res.end()
                }
            } catch (err) {
                throw err;
            }
        }
    }
}


module.exports = UsersManager;