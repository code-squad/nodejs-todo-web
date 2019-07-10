const path = require('path');
const fs = require('fs');

const getDataFromFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    });
}

const listPosts = () => async (req, res, next) => {
    const filePath = path.join(__dirname, '../public/web.html');

    try {
        const data = await getDataFromFile(filePath);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    } catch (err) {
        res.statusCode = 404;
        res.end('Not found');
    }
}

const isFileExit = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.access(filePath, (err) => {
            if (err) reject('notExit');
            resolve('exit');
        })
    });
}

const signUp = () => async (req, res, next) => {
    const { id } = req.body;
    try {
        const IDexit = await isFileExit(`users/${id}.json`);
        res.end(IDexit);
    } catch (notExit) {
        res.end(notExit);
    }
}

const createAccount = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err) reject('fail');
            resolve('Created account. Enjoy Todo List!');
        })
    });
}

const createID = () => async (req, res, next) => {
    const { id, pwd } = req.body;
    const filePath = `users/${id}.json`
    const data = `{ "id": "${id}", "pwd": "${pwd}"}`
    try {
        const note = await createAccount(filePath, data);
        res.end(note);
    } catch (fail) {
        res.end(fail);
    }
}

module.exports = {
    listPosts,
    signUp,
    createID,
}