const { parseCookie } = require('../../util');

module.exports = (req, res, next) => {
  console.log(`쿠키 값: ${req.headers.cookie}`);
  const cookies = parseCookie(req.headers.cookie);
  req.sessionId = cookies ? cookies.token : undefined;
  next();
};