const app = require('./src/Application');
const serveStatic = require('./middlewares/serve-static');
// const index = require('./routes/index');
const Index = require('./routes/index');
const logger = require('./middlewares/logger');
const bodyParser = require('./middlewares/body-parser');
const UserManager = require('./model/model');
const Util = require('./util/util');
const util = new Util();
const userManager = new UserManager(util);
const index = new Index(util);
const port = 3000;
const hostName = '127.0.0.1';

app.use(logger());
app.use(bodyParser());
app.use(serveStatic());
app.use('/', index.listPosts());
app.post('/identification', userManager.canIUseIt());
app.post('/createID', userManager.createID());
app.post('/login', userManager.login());

app.listen(port, hostName, () => {
    console.log(`${port}번 포트에서 서버 대기중입니다.`)
})
