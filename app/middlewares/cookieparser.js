const { parseCookie } = require('../../util');

module.exports = (req, res, next) => {
  const cookies = parseCookie(req.headers.cookie);
  req.sessionId = cookies ? cookies.token : undefined;
  next();
};