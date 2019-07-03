const Router = require('../router');
const { isNotLoggedIn } = require('../middlewares/loginchecker');
const sessionManager = require('../../sessionmanager');

const logoutRouter = new Router();

logoutRouter.post('/', isNotLoggedIn, async (req, res, next) => {
  sessionManager.removeSession(req.sessionId);
  res.statusCode = 302;
  res.setHeader('Set-Cookie', [`token=${req.sessionId}; Max-Age=0; HttpOnly`]);
  res.setHeader('location', '/');
  res.end();
});

module.exports = logoutRouter;