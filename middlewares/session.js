const sessionMemory = require('../db/sessionMemory');

const session = () => (req, res, next) => {
  const cookie = (req.headers.cookie);

  if (cookie === undefined) {
    req.session = 'false';
    next();
    return;
  }

  const sessionID = cookie.split('sessionID=')[1];

  if (sessionMemory[sessionID]) {
    req.session = {
      'userID' : sessionMemory[sessionID]['userID'],
      'sessionID' : sessionID,
    } 
  }

  next();
}

module.exports = session;