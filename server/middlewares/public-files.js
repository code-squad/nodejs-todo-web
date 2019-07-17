const path = require('path');
const fs = require('fs');

const publicFile = (req, res, next) => {
  const mimetypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.svg': 'application/image/svg+xml',
    '.wasm': 'application/wasm',
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
  serveStaticFile : publicFile,
}