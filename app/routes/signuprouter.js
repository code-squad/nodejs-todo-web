const Router = require('../router');
const { isLoggedIn } = require('../middlewares/loginchecker');
const { makeFilePath } = require('../../util');
const userChecker = require('../middlewares/userchecker');
const db = require('../../db');
const fs = require('fs');
const signupRouter = new Router();

signupRouter.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const content = await fs.promises.readFile(makeFilePath('/public/signup.html'));
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Set-Cookie', [`token=${req.sessionId}; Max-Age=0; HttpOnly`]);
    res.end(content);
  } catch (error) {
    next(error);
  }
});

signupRouter.post('/', isLoggedIn, userChecker, async (req, res, next) => {
  try {
    await db.makeUserFile(req.body.userId, req.body.password);
    res.statusCode = 302;
    res.setHeader('location', '/todo');
    res.end();
  } catch (error) {
    next(error);
  }
});

module.exports = signupRouter;