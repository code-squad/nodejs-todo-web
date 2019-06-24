const path = require('path');
const fs = require('fs');

const serveStatic = (req, res, next) => {

    const mimeType = {
        '.html': 'test/html',
        '.js'  : 'text/javascript',
        '.css' : 'text/css',
        '.png' : 'image/png',
        '.jpg' : 'image/jpg'
    };

    const ext = path.parse(req.url).ext;
    const publicPath = path.join(__dirname, '../public');

    if (Object.keys(mimeType).includes(ext)) {
        fs.readFile(`${publicPath}${req.url}`, (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end('Not Found');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', mimeType[ext]);
                res.end(data);
            }
            ;

        })
    } else {
        next()
    }
};

module.exports = serveStatic;