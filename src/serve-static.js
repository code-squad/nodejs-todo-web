const fs = require('fs');
const path = require('path');

const ServeStatic = class {
  constructor() {
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
}

module.exports = ServeStatic;