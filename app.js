
const serveStatic = require('./middlewares/serve-static');
const logger = require('./middlewares/logger');
const index = require('./routers/index');
const login = require('./routers/login');
const register = require('./routers/register');
const register_info = require('./api/register');
const login_info = require('./api/login');
const logout = require('./api/logout');
const addTask = require('./api/addTask');
const deleteTask = require('./api/deleteTask');
const updateTask = require('./api/updateTask');
const errors = require('./middlewares/errors');
const bodyParser = require('./middlewares/body-parser');
const App = require('./src/Application');
const app = App();

app.use(logger());
app.use(bodyParser());
app.use(serveStatic());
app.get('/', login.listLoginPage());
app.post('/register', register.listRegisterPage());
app.post('/api/register', register_info.valid_info());
app.post('/api/login', login_info.valid_info());
app.get('/todo', index.todoList());
app.post('/logout', logout.delete_session());
app.post('/api/addTask', addTask.addTodoList());
app.post('/api/deleteTask', deleteTask.deleteTodoList());
app.post('/api/updateTask', updateTask.updateTodoList());
app.use(errors.error404());
app.use(errors.error());

module.exports = app;
