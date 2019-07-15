const fs = require('fs');

class Error {
  error404(req, res, next) {
    res.statusCode = 404;
    const data = fs.readFileSync(__dirname + '/public/404.html');
    res.write(data);
    res.end();
  }
  error(err, req, res, next) {
    res.statusCode = 500;
    const data = fs.readFileSync(__dirname + '/public/error.html');
    res.write(data);
    res.end();
  }
}
const error = new Error();

module.exports = error;