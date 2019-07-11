const App = require('./application');
const { serveStaticFile } = require('./middlewares/public-files');
const app = new App();

app.use(serveStaticFile);



module.exports = app;