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

module.exports = {
    listPosts
}