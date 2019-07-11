const App = require('./application');
const bodyParser = require('./middlewares/body-parser');
const indexController = require('./routes/indexController');
const userController = require('./routes/userController');
const { serveStaticFile } = require('./middlewares/public-files');
const app = new App();

app.use(serveStaticFile);
app.use(bodyParser);
app.use('/', indexController);
app.use('/user', userController);

module.exports = app;