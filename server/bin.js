const app = require('./src/app');
const PORT = 3000;
const HOSTNAME = '127.0.0.1';

app.listen(PORT, HOSTNAME, () => {
  console.log(`http://${HOSTNAME}:${PORT} 서버 열림...`);
});