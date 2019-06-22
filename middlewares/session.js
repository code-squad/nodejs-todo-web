const sessionMemory = require('../db/sessionMemory');

const session = () => (req, res, next) => {
  const cookie = (req.headers.cookie);
  const sessionID = cookie.split('sessionID=')[1];

  req.session = 'false';
  
  if (sessionMemory[sessionID]) {
    req.session = sessionMemory[sessionID];
  }

  next();
}

module.exports = session;