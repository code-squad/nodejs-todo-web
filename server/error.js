
class Error {
  error404(req, res, next) {
    res.statusCode = 404;
    res.write('Not Found');
    res.end();
  }
  error(err, req, res, next) {
    res.statusCode = 500;
    res.write('Server Error');
    res.end();
  }
}
const error = new Error();

module.exports = error;