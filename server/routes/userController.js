const User = require('../user');

const user = new User();

const userController = async (req, res, next) => {
  try{
    const query = req.body;
    console.log(req.url, '어디로 갔니...');
    if (req.url !== '/user') {
      await user.exec[req.url](req,res,next);
      return;
    }
    console.log('through this');
    const { statusCode, message, location } = await user.exec[req.method](query);
    res.statusCode = statusCode;
    if (location) {
      res.setHeader('Location', location);
    } else {
      res.write(message);
    }
    res.end();
    return;
  } catch (err) {
    next(err);
    return;
  }
}

module.exports = userController;