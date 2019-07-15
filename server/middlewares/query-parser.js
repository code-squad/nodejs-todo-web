const url = require('url');
const qs = require('querystring');

const queryParser = (req, res, next) => {
  const queryData = url.parse(req.url);
  req.url = queryData.pathname;
  req.query = qs.parse(queryData.query);
  next();
}

module.exports = queryParser;