const App = require('./src/application');
const app = new App();
const serveStatic = require('./middlewares/serve-static');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./middlewares/logger');
const todoController = require('./controller/todo');
const loginController = require('./controller/login');

app.use(logger());
app.use(serveStatic());
app.get('/', loginController.getPage());
app.post('/login', loginController.loginRequest());
app.get('/todo', todoController.getPage());
app.use(errorHandler.error404());
app.use(errorHandler.error500());

module.exports = app;