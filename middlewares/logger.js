const methodColorMap = {
    GET: '\x1b[32m',
    POST: '\x1b[36m',
    PUT: '\x1b[33m',
    DELETE: '\x1b[31m',
    reset: '\x1b[0m'
}

const logger = () => (req, res, next) => {
    const coloredMethod = (method = '') => {
        return `${methodColorMap[method]}${method}${methodColorMap.reset}`
    }

    const log = `${coloredMethod(req.method)} ${req.url}`
    console.log(log);
    next();
}

module.exports = logger;