const db = require('../../db');

module.exports = async (req, res, next) => {
  try {
    const existUser = await db.isExistUser(req.body.userId);
    if(existUser) {
      res.statusCode = 409;
      res.end();
    } else {
      next();
    }
  } catch (error) { 
    next(error);
  }
};