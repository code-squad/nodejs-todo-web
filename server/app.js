const bodyParser = require('./middlewares/body-parser');
const logger = require('./middlewares/logger');

const indexController = require('./routes/indexController');
const userController = require('./routes/userController');
const gameController = require('./routes/gameController');
const error = require('./error');
const { serveStaticFile } = require('./middlewares/public-files');

const App = require('./application');
const app = new App();

const queryParser = require('./middlewares/query-parser');

app.use(logger);
app.use(serveStaticFile);
app.use(queryParser);
app.use(bodyParser);

app.use('/', indexController);
app.use('/signIn', indexController);

app.use('/user', userController);
app.use('/logIn', userController);

app.use('/game', gameController);

app.use(error.error404);
app.use(error.error);

module.exports = app;