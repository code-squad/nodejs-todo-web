const app = require('./src/Application');
const ServeStatic = require('./middlewares/serve-static');
const Index = require('./routes/index');
const logger = require('./middlewares/logger');
const bodyParser = require('./middlewares/body-parser');
const UserManager = require('./model/model');
const errors = require('./middlewares/errors');
const Util = require('./util/util');
const util = new Util();
const index = new Index();
const userManager = new UserManager(util);
const serveStatic = new ServeStatic(util);


app.use(logger());
app.use(bodyParser());
app.use(serveStatic.serveStatic());
app.use('/', index.listPosts());
app.post('/identification', userManager.canIUseIt());
app.post('/createID', userManager.createID());
app.post('/login', userManager.login());
app.post('/createSchedule', userManager.createSchedule());
app.post('/changeSchedule', userManager.changeSchedule());
app.get('/logOut', userManager.logOut());
app.use(errors.error404());
app.use(errors.error());


module.exports = app;
