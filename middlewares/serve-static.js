const fs = require('fs');
const path = require('path');

const ServeStatic = class {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.mimeType = {
      '.ico': 'image/x-icon',
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.ttf': 'aplication/font-sfnt'
    }
    this.publicPath = path.join(__dirname, '../public');
  }

  getExt(req) {
    return path.parse(req.url).ext;
  }

  readFile(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) reject(err);
        resolve(data);
      })
    })
  }

  async serveStaticFile(req, res, next) {
    const ext = this.getExt(req);
    if (Object.keys(this.mimeType).includes(ext)) {
      const filePath = `${this.publicPath}${req.url}`;
    
      try {
        const data = await this.readFile(filePath);
        res.statusCode = 200;
        res.setHeader('Content-Type', this.mimeType[ext]);
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
}

module.exports = ServeStatic;