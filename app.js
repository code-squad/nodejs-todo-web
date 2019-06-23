const App = require('./src/application');
const app = new App();
const serveStatic = require('./middlewares/serve-static');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./middlewares/logger');
const bodyParser = require('./middlewares/body-parser');
const todoController = require('./controller/todo');
const loginController = require('./controller/login');
const session = require('./middlewares/session');
const cardController = require('./controller/card');

app.use(logger());
app.use(session());
app.use(serveStatic());
app.use(bodyParser());
app.get('/', loginController.getPage());
app.post('/login', loginController.loginRequest());
app.get('/todo', todoController.getPage());
app.post('/add', cardController.addCard());
app.use(errorHandler.error404());
app.use(errorHandler.error500());

module.exports = app;