const path = require("path");
const fs = require("fs");
const dbHandler = require("../api/db-handler");

const getSignInPage = () => async (req, res, next) => {
  const publicPath = path.join(__dirname, "../public");
  const data = await dbHandler.readFile(`${publicPath}/sign-in.html`);

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(data);
};

module.exports = {
  getSignInPage
};
