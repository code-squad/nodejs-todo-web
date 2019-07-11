const serveStatic = require("./middlewares/serve-static");
const logger = require("./middlewares/logger");
const errors = require("./middlewares/errors");
const signIn = require('./routers/sign-in');
const index = require("./routers/index");
const App = require("./src/Application");
const app = App();

app.use(logger());
app.use(serveStatic());
app.get("/", signIn.getSignInPage());
app.get("/todo", index.index());
app.use(errors.error404());
app.use(errors.error());

module.exports = app;
