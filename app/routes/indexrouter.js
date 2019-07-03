const Router = require('../router');
const { makeFilePath } = require('../../util');
const { isLoggedIn } = require('../middlewares/loginchecker');
const fs = require('fs');
const indexRouter = new Router();

indexRouter.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const content = await fs.promises.readFile(makeFilePath('/public/login.html'));
    res.end(content);
  } catch (error) {
    next(error);
  }
});

module.exports = indexRouter;