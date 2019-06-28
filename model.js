const fs = require('fs');

const model = {
    readStaticFile(file) {
        return new Promise((resolve) => {
            fs.readFile(file, (error, data) => {
                if(error) console.error(error);
                resolve(data);
            });
        });
    }
}

module.exports = model;