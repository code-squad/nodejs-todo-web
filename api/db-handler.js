const fs = require("fs");

const readFile = (path, encoding = "utf8") => {
  return new Promise((resolve, reject) => {
    try {
      
      fs.readFile(path, encoding, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    } catch (error) {
      console.log(error)
    }
  });
};

module.exports = {
  readFile
};
