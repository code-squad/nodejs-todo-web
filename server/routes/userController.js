const User = require('../src/user');

const user = new User();

const userController = async (req, res, next) => {
  try{
    await user.exec[`${req.method} ${req.url}`](req, res, next);
    return;
  } catch (err) {
    next(err);
    return;
  }
}

module.exports = userController;