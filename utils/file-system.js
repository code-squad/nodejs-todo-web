const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const writeFile = (path, data, encoding = 'utf8') => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, encoding, (err) => {
      if (err) reject(err);
      resolve(data);
      console.log(`save : ${data}`)
    })
  })
}

const appendFile = (path, data, encoding = 'utf8') => {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, data, encoding, (err) => {
      if (err) reject(err);
      resolve(data);
      console.log(`save : ${data}`)
    })
  })
};

module.exports = {
  readFile,
  writeFile,
  appendFile,
}