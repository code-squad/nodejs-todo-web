const app = require('./src/Application');
const serveStatic = require('./middlewares/serve-static');
const index = require('./routes/index');
const logger = require('./middlewares/logger');
const bodyParser = require('./middlewares/body-parser');
const port = 3000;
const hostName = '127.0.0.1';


app.use(logger());
app.use(bodyParser());
app.use(serveStatic());
app.use('/', index.listPosts());
app.use('/identification', index.signUp());

app.listen(port, hostName, () => {
    console.log(`${port}번 포트에서 서버 대기중입니다.`)
})
