const App = require('./src/application');
const app = new App();
const serveStatic = require('./middlewares/serve-static');
const index = require('./routers/index')

const error404 = (req, res, next) => {
  res.statusCode = 404;
  res.end('Not Found')
}

const error = (err, req, res, next) => {
  res.statusCode = 500;
  res.end()
}

app.use('/', index.index());
app.use(serveStatic());
app.use(error404);
app.use(error);

module.exports = app;