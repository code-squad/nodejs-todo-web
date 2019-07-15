const User = require('../user');

const user = new User();

const userController = async (req, res, next) => {
  try{
    const query = req.body;
    const { statusCode, message, location } = await user.exec[req.method](query);
    res.statusCode = statusCode;
    if (location) {
      res.setHeader('Location', location);
    } else {
      res.write(message);
    }
    res.end();
  } catch (err){
    next(err);
  }
}

module.exports = userController;