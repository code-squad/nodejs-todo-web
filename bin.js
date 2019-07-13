const app = require('./src/Application');
const ServeStatic = require('./middlewares/serve-static');
const Index = require('./routes/index');
const logger = require('./middlewares/logger');
const bodyParser = require('./middlewares/body-parser');
const UserManager = require('./model/model');
const Util = require('./util/util');
const util = new Util();
const userManager = new UserManager(util);
const index = new Index();
const serveStatic = new ServeStatic(util);
const port = 3000;
const hostName = '127.0.0.1';

app.use(logger());
app.use(bodyParser());
app.use(serveStatic.serveStatic());
app.use('/', index.listPosts());
app.post('/identification', userManager.canIUseIt());
app.post('/createID', userManager.createID());
app.post('/login', userManager.login());
app.post('/createSchedule', userManager.createSchedule());

app.listen(port, hostName, () => {
    console.log(`${port}번 포트에서 서버 대기중입니다.`)
})
