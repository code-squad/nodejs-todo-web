const App = require('./src/Application');
const app = new App();
const port = 3000;
const hostName = '127.0.0.1';

app.listen(port, hostName, () => {
    console.log(`${port}번 포트에서 서버 대기중입니다.`)
})
