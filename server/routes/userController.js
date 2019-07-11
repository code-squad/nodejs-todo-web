const User = require('../user');

const user = new User();

const userController = async (req, res, next) => {
  const query = req.body;
  await user.exec[req.method](query);
}

module.exports = userController;