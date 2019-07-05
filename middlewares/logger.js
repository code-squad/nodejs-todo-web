const color = {
  'GET' : '\x1b[33m',     // yellow
  'POST' : '\x1b[35m',    // magenta
  'PATCH' : '\x1b[32m',     // green
  'DELETE' : '\x1b[31m',  // red

  'reset' : '\x1b[0m'
}

const logger = () => (req, res, next) => {
  const method = req.method;
  const log = `${color[method]}[${method}]${color.reset} ${req.url}`
  console.log(log)
  next();
}

module.exports = logger