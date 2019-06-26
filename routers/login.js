const path = require('path');
const fs = require('fs');
const db = require('../api/DataHandler');

const listLoginPage = () => (req, res, next) => {
    const publicPath = path.join(__dirname, '../public');
    console.log('req.header.cookie: ',req.headers.cookie);
    const cookies = parseCookies(req.headers.cookie);
    const session = db.get('session').value();
    console.log('session!',session);
    console.log('cookie!', cookies);

    if (cookies.session) {
        res.writeHead(302, {
            Location: '/todo'
        });
        res.end();
    } else {
        fs.readFile(`${publicPath}/login.html`, (err, data) => {
            if (err) throw err;

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    }


};


const parseCookies = (cookie = '') => {
    return cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});
};

module.exports = {
    listLoginPage,
};