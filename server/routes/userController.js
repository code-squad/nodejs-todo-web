const User = require('../user');

const user = new User();

const userController = async (req, res, next) => {
  const query = req.body;
  const { statusCode, message } = await user.exec[req.method](query);
  res.statusCode = statusCode;
  res.write(message);
  res.end();

  next();
}

module.exports = userController;