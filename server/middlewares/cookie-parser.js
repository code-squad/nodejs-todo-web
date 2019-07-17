const cookieParser = (req, res, next) => {
  const tokens = req.headers.cookie.split(';');
  const cookies = tokens.reduce((acc, cur) => {
    cur =  cur.trim();
    const key = cur.split('=')[0];
    const value = cur.split('=')[1];
    acc[key] = value;
    return acc;
  }, {});
  req.cookies = cookies;
  next();
}


module.exports = cookieParser;