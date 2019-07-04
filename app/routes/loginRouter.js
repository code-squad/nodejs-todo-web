const Router = require('../router');
const { isLoggedIn } = require('../middlewares/loginchecker');
const sessionManager = require('../../sessionmanager');
const db = require('../../db');
const { generateSessionId } = require('../../util');

const loginRouter = new Router();

loginRouter.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const loginResult = await db.readUserPassword(req.body);
    if(loginResult){
      const sessionId = generateSessionId(req.body.userId), maxAge = sessionManager.getMaxAge();
      sessionManager.setSession(sessionId, req.body.userId, (new Date().getTime()));
      res.setHeader('Set-Cookie', [`token=${sessionId}; Max-Age=${maxAge}; HttpOnly`]);
      res.statusCode = 302;
      res.setHeader('location', '/todo');
      res.end();
    } else {
      res.statusCode = 403;
      res.end();
    }
  } catch (error) {
    if(error.errno === -2){
      res.statusCode = 403;
      res.end();
    } else {
      next(error);
    }
  }
});

module.exports = loginRouter;