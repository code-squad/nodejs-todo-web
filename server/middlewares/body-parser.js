const qs = require('querystring');

const bodyParser = (req, res, next) => {
  let body = [];
  req.on('data', chunk => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    const query = qs.parse(body);
    req.body = query;
    next();
  });
}

module.exports = bodyParser;