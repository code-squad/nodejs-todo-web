const path = require('path');
const fs = require('fs');
const Template = require('../public/js/template');
const template = new Template();


class ServeStatic {
    constructor(util) {
        this.util = util;
        this.mimeType = {
            '.ico': 'image/x-icon',
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.eot': 'appliaction/vnd.ms-fontobject',
            '.ttf': 'aplication/font-sfnt'
        };
    }

    getFilePath(url) {
        return path.join(__dirname, `../public${url}`);
    }

    getExt(url) {
        return path.parse(url).ext;
    }

    getDataFromFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        });
    }

    serveStatic() {
        return async (req, res, next) => {
            const filePath = this.getFilePath(req.url)
            const ext = this.getExt(req.url);
            if (Object.keys(this.mimeType).includes(ext)) {
                try {
                    let data;
                    if (ext === '.js') {
                        const cookies = this.util.parseCookies(req.headers.cookie);
                        if (cookies.session) {
                            console.log('세션온')
                        }
                        data = template.jsFile();
                    } else {
                        data = await this.getDataFromFile(filePath);
                    }
                    res.statusCode = 200;
                    res.setHeader('Content-Type', this.mimeType[ext]);
                    res.end(data);
                } catch (err) {
                    res.statusCode = 404;
                    res.end('Not found');
                }
            } else {
                next();
            }
        }
    }
}

module.exports = ServeStatic;

