const fs = require('fs');

const model = {
    readStaticFile(file) {
        return new Promise((resolve) => {
            fs.readFile(file, (error, data) => {
                if(error) console.error(error);
                resolve(data.toString());
            });
        });
    },

    writeStaticFile(file, data) {
        return new Promise((resolve) => {
            fs.writeFile(file, JSON.stringify(data), (error) => {
                if(error) console.error(error);
                resolve(true);
            });
        });
    }
}

module.exports = model;