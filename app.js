const serveStatic = require("./middlewares/serve-static");
const logger = require("./middlewares/logger");
const errors = require("./middlewares/errors");
const index = require("./routers/index");
const App = require("./src/Application");
const app = App();

app.use(logger());
app.use(serveStatic());
app.use("/", index.index());
app.use(errors.error404());
app.use(errors.error());

module.exports = app;
