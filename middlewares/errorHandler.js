const error404 = () => (req, res, next) => {
  res.statusCode = 404;
  res.end('404 : Not Found')
}

const error500 = () => (err, req, res, next) => {
  res.statusCode = 500;
  res.end('500 : Internal Error')
}

module.exports = {
  error404,
  error500
}