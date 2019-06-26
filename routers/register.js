const path = require('path');
const fs = require('fs');

const listRegisterPage = () => (req, res, next) => {
    const publicPath = path.join(__dirname, '../public');

    fs.readFile(`${publicPath}/register.html`, (err, data) => {
        if (err) throw err;

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    });
};


module.exports = {
    listRegisterPage,
};