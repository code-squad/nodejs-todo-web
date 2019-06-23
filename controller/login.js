const path = require('path');
const fs = require('fs');
const csvParser = require('../utils/csv-parser');
const cryptoUtil = require('../utils/crypto-util');
const sessionMemory = require('../db/sessionMemory');
const fileUtil = require('../utils/file-system');

const getPage = () => async (req, res, next) => {
  const publicPath = path.join(__dirname, '../public')
  const data = await fileUtil.readFile(`${publicPath}/login.html`);

  res.writeHead(200, {'Content-Type' : 'text/html'});
  res.end(data)
}

const isValidUser = (userObjData, targetId, password) => {
  if (userObjData[targetId]) {
    return userObjData[targetId]['password'] === password;
  }
  return false;
}

const setCookieStr = (req) => {
  const cookieString = `sessionID=${req.session.sessionID}; Max-age=${60 * 60 * 24 * 7}`;
  return cookieString;
}

const loginRequest = () => async (req, res, next) => {
  const {id, password} = req.body;
  const userObjData = await csvParser.getKeyValueObj('./db/user.csv');
  const isValid = isValidUser(userObjData, id, password);

  if (isValid) {
    const sessionID = await cryptoUtil.getCryptoHash(id);
    req['session'] = {
      'sessionID' : sessionID,
      'userID' : id
    }

    sessionMemory[sessionID] = {
      'userID' : id
    }

    const cookieStr = setCookieStr(req);
    res.writeHead(302, {'Set-Cookie' : [cookieStr], 'Location': '/todo' });
    res.end();
    
  } else {
    res.writeHead(302, {'Location': '/' });
    res.end();
  }
  
  next();
}

module.exports = {
  getPage,
  loginRequest
}