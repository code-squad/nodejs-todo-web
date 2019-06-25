const App = require('./src/application');
const app = new App();
const serveStatic = require('./middlewares/serve-static');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./middlewares/logger');
const bodyParser = require('./middlewares/body-parser');
const todoController = require('./controller/todo');
const loginController = require('./controller/login');
const session = require('./middlewares/session');

app.use(logger());
app.use(session());
app.use(serveStatic());
app.use(bodyParser());
app.get('/', loginController.getPage());
app.post('/login', loginController.loginRequest());
app.get('/todos', todoController.getPage());
app.post('/todos', todoController.addTodo());
app.delete('/todos/:id', todoController.deleteTodo());
app.patch('/key', todoController.updateKey());
app.use(errorHandler.error404());
app.use(errorHandler.error500());

module.exports = app;