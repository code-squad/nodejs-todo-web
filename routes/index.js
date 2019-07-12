const path = require('path');
const fs = require('fs');

class Index {
    constructor(util) {
        this.util = util;
    }

    getDataFromFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        });
    }

    listPosts() {
        return async (req, res, next) => {
            const filePath = path.join(__dirname, '../public/web.html');
            const cookies = this.util.parseCookies(req.headers.cookie);
            console.log(cookies);
            console.log(this.util.session);
            try {
                const data = await this.getDataFromFile(filePath);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            } catch (err) {
                res.statusCode = 404;
                res.end('Not found');
            }
        }
    }
}

module.exports = Index;
