const sessionMemory = require('../db/sessionMemory');

const removeCookieStr = (req) => {
  const cookieString = `sessionID=''; Max-age=0`;
  return cookieString;
}

const logoutRequest = () => async (req, res, next) => {
  
  const sessionID = req.session.sessionID;
  if (sessionMemory[sessionID]) {
    delete sessionMemory[sessionID];
  }

  const cookieStr = removeCookieStr(req);
  res.writeHead(302, {
    'Set-Cookie': [cookieStr],
    'Location': '/'
  });
  
  res.end();
}

module.exports = {
  logoutRequest
}