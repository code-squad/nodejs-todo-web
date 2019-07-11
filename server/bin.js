const PORT = 3000;
const HOSTNAME = '127.0.0.1';

const App = require('./app');
const app = new App();

app.listen(PORT, HOSTNAME, () => {
  console.log(`http://${HOSTNAME}:${PORT} 서버 열림...`);
});
