const App = require('./src/application');
const app = new App();
const ServeStatic = require('./middlewares/serve-static');
const serveStatic = new ServeStatic(app.req, app.res);

const path = require('path')
const fs = require('fs')

const index = (req, res, next) => {
  const publicPath = path.join(__dirname, './public')

  fs.readFile(`${publicPath}/index.html`, (err, data) => {
    if (err) throw err

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(data)
  })
}

app.use(index);
app.use(serveStatic.serveStaticFile);

module.exports = app;