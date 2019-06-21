const path = require('path');
const fs = require('fs');
const csvParser = require('../utils/csv-parser');
const cryptoUtil = require('../utils/crypto-util');

const getPage = () => (req, res, next) => {
  const publicPath = path.join(__dirname, '../public')

  fs.readFile(`${publicPath}/login.html`, (err, data) => {
    if (err) throw err

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(data)
  })
}

const isValidUser = (userObjData, targetId, password) => {
  if (userObjData[targetId]) {
    return userObjData[targetId]['password'] === password;
  }
  return false;
}

module.exports = {
  getPage,
  loginRequest
}