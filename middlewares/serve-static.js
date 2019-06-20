const fs = require('fs');
const path = require('path');

  const getExt = (req) => {
    return path.parse(req.url).ext;
  }

  const readFile = (path) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) reject(err);
        resolve(data);
      })
    })
  }
  
  const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ttf': 'aplication/font-sfnt'
  }
  
  const serveStatic = () => async (req, res, next) => {
    const ext = getExt(req);

    if (Object.keys(mimeType).includes(ext)) {
      const publicPath = path.join(__dirname, '../public');
      const filePath = `${publicPath}${req.url}`;
    
      try {
        const data = await readFile(filePath);
        res.statusCode = 200;
        res.setHeader('Content-Type', mimeType[ext]);
        res.write(data);
        res.end();
      } catch (error) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.write('Not Found File');
        res.end();
      }
    } else {
      next();
    } 
  }

module.exports = serveStatic;