const http = require('http');

const Middleware = require('./app/middleware');

const cookieParser = require('./app/middlewares/cookieparser');
const staticRouter = require('./app/middlewares/staticRouter');
const bodyParser = require('./app/middlewares/bodyparser');

const indexRouter = require('./app/routes/indexrouter');
const loginRouter = require('./app/routes/loginRouter');
const signupRouter = require('./app/routes/signuprouter');
const logoutRouter = require('./app/routes/logoutrouter');
const todoRouter = require('./app/routes/todorouter');
const todolistRouter = require('./app/routes/todolistrouter');

const server = http.createServer(async (req, res) => {
  req.on('error', (err) => {
    console.error(err);
    res.statusCode = 400;
    res.end();
  });
  res.on('error', (err) => {
    console.error(err);
    res.statusCode = 500;
    res.end();
  });

  const middleware = new Middleware();

  console.log(`This req find ${req.url} with ${req.method} method.`);

  middleware.add(staticRouter);

  middleware.add((req, res, next) => {
    if(RegExp(/\/data.*/).test(req.url)){
      res.statusCode = 403;
      res.end();
    } else {
      next();
    }
  });

  middleware.add(cookieParser);
  middleware.add(bodyParser())

  middleware.add('/', indexRouter);
  middleware.add('/signup', signupRouter);
  middleware.add('/login', loginRouter);
  middleware.add('/logout', logoutRouter);
  middleware.add('/todo', todoRouter);
  middleware.add('/todolist', todolistRouter);

  middleware.add((req, res, next) => {
    res.statusCode = 404;
    res.end();
  });

  middleware.add((err, req, res, next) => {
    console.error(err);
    res.statusCode = (res.statusCode !== 200 ? res.statusCode : 500);
    res.end();
  });
  middleware.run(req, res);
});

module.exports = server;
