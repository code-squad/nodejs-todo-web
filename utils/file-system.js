const fs = require('fs');

const readFile = (path, encoding = 'utf8') => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}

const writeFile = (path, data, encoding = 'utf8') => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, encoding, (err) => {
      if (err) reject(err);
      resolve();
      console.log(`save : ${data}`)
    })
  })
}

const appendFile = (path, data, encoding = 'utf8') => {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, data, encoding, (err) => {
      if (err) reject(err);
      resolve();
      console.log(`save : ${data}`)
    })
  })
};

module.exports = {
  readFile,
  writeFile,
  appendFile,
}