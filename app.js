const App = require('./src/application');
const app = new App();
const serveStatic = require('./middlewares/serve-static');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./middlewares/logger');
const index = require('./routers/index');

app.use(logger());
app.use(serveStatic());
app.use('/', index.index());
app.use(errorHandler.error404());
app.use(errorHandler.error500());

module.exports = app;