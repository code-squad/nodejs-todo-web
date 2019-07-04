const sessionManager = require('../../sessionmanager');

exports.isLoggedIn = (req, res, next) => {
  if(sessionManager.isValidSession(req.sessionId)) {
    res.statusCode = 302;
    res.setHeader('location', '/todo');
    res.end();
  } else {
    next();
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if(!sessionManager.isValidSession(req.sessionId)) {
    sessionManager.removeSession(req.sessionId);
    res.statusCode = 302;
    // res.setHeader('Set-Cookie', [`token=${req.sessionId}; Max-Age=0; HttpOnly`]);
    res.setHeader('location', '/');
    res.end();
  } else {
    next();
  }
};