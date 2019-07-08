const fs = require('fs');

const model = {
    readStaticFile(file) {
        return new Promise((resolve, reject) => {
            fs.readFile(file, (error, data) => {
                try {
                    if(error) throw error;
                    resolve(data.toString());
                } catch (error) {
                    console.error(error);
                    reject(error);
                }
            });
        });
    },

    writeStaticFile(file, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(file, JSON.stringify(data), (error) => {
                try {
                    if(error) console.error(error);
                    resolve(true);
                } catch (error) {
                    console.error(error);
                    reject(error);
                }
            });
        });
    }
}

module.exports = model;