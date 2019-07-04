const bodyParser = () => (req, res, next) => {
  let body = []

  req.on('data', chunk => {
    body.push(chunk)
  })

  req.on('end', () => {
    body = Buffer.concat(body).toString()

    try {
      if(body) {
        req.body = JSON.parse(body);
      }
      next();
    } catch (error) {
      next(error);
    }
  });
}

module.exports = bodyParser;