const error404 = () => (req, res, next) => {
    console.log('404 error')
    res.statusCode = 404;
    res.end('Not Found');
}

const error = () => (err, req, res, next) => {
    console.log('500 error')
    res.statusCode = 500;
    res.end('500 error');
}

module.exports = {
    error404,
    error,
}