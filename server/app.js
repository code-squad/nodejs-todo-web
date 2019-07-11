const App = require('./application');
const bodyParser = require('./middlewares/body-parser');
const indexController = require('./routes/indexController');
const error = require('./error');
const userController = require('./routes/userController');
const { serveStaticFile } = require('./middlewares/public-files');
const app = new App();

app.use(serveStaticFile);
app.use(bodyParser);

app.use('/', indexController);
app.use('/signIn', indexController);

app.use('/user', userController);

app.use(error.error404);
app.use(error.error);

module.exports = app;