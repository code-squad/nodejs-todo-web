const bodyParser = require('../middlewares/body-parser');
const logger = require('../middlewares/logger');
const cookieParser = require('../middlewares/cookie-parser');
const queryParser = require('../middlewares/query-parser');
const isLoggedIn = require('../middlewares/is-logged-in');

const indexController = require('../routes/indexController');
const userController = require('../routes/userController');
const gameController = require('../routes/gameController');
const error = require('./error');
const { serveStaticFile } = require('../middlewares/public-files');
const App = require('./application');
const app = new App();

const io = require('socket.io')(app.server);
require('./socket')(io);
app.use(logger);
app.use(serveStaticFile);
app.use(queryParser);
app.use(bodyParser);
app.use(cookieParser);
app.use(isLoggedIn);

app.use('/', indexController);
app.use('/signIn', indexController);

app.use('/user', userController);
app.use('/logIn', userController);
app.use('/logOut', userController);

app.use('/game', gameController);

app.use(error.error404);
app.use(error.error);



module.exports = app;