const fs = require('fs');

const isLoggedIn = async (req, res, next) => {
  if (!req.cookies){
    next();
    return;
  }
  const data = fs.readFileSync('./data/session.json');
  const sessions = JSON.parse(data);
  const matchedSession = await sessions.filter(ses => {
    return ses.username === req.cookies['name'] &&
    ses.id === req.cookies['sid'];
  });
  console.log('matched session', matchedSession);
  req.isLoggedIn = matchedSession.length ? true : false;
  console.log(req.isLoggedIn);
  next();
  return;
}

module.exports = isLoggedIn;