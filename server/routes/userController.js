const User = require('../user');

const user = new User();

const userController = async (req, res, next) => {
  await user.exec[req.method]();
}