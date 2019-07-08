const path = require('path');
const fs = require('fs');


const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
};

const getFilePath = (url) => {
    return path.join(__dirname, `../public${url}`);
}

const getExt = (url) => {
    return path.parse(url).ext;
}

const getDataFromFile = (filePath) => {
    console.log(filePath);
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    });
}

const serveStatic = () => async (req, res, next) => {
    const filePath = getFilePath(req.url)
    const ext = getExt(req.url);
    if (Object.keys(mimeType).includes(ext)) {
        try {
            const data = await getDataFromFile(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', mimeType[ext]);
            res.end(data);
        } catch (err) {
            res.statusCode = 404;
            res.end('Not found');
        }
    } else {
        next();
    }
}

module.exports = serveStatic;