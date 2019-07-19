const colors = {
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  reset: "\x1b[0m"
};

const methodColorMap = {
  GET: colors.green,
  POST: colors.cyan,
  PUT: colors.yellow,
  DELETE: colors.red
};

const logger = () => (req, res, next) => {
  const coloredMethod = method => {
    return `${methodColorMap[method]}${method}${colors.reset}`;
  };
  const log = `${coloredMethod(req.method)} ${req.url}`;
  console.log(log);

  next();
};

module.exports = logger;
