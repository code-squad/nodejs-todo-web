const serveStatic = require("./middlewares/serve-static");
const logger = require("./middlewares/logger");
const errors = require("./middlewares/errors");
const bodyParser = require("./middlewares/body-parser");
const signIn = require("./routers/sign-in");
const session = require("./middlewares/session");
const index = require("./routers/index");
const App = require("./src/Application");
const app = App();

app.use(logger());
app.use(session());
app.use(serveStatic());
app.use(bodyParser());
app.get("/", signIn.getSignInPage());
app.get("/todo", index.index());
app.use(errors.error404());
app.use(errors.error());

module.exports = app;
