const path = require('path');
const fs = require('fs');

const publicFile = (req, res, next) => {
  const mimetypes = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt',
  };
  const ext = path.parse(req.url).ext;
  const publicPath = path.join(__dirname, '../public');
  if (Object.keys(mimetypes).includes(ext)) {
    fs.readFile(`${publicPath}${req.url}`, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('Not Found');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', mimetypes[ext]);
        res.end(data);
      }
    })
  } else {
    res.statusCode = 200;
    next();
  }
}

module.exports = {
  checkStaticFile : publicFile,
}