const path = require("path");
const fs = require("fs");
const fileHandler = require("../api/file-handler");

const getSignInPage = () => async (req, res, next) => {
  const publicPath = path.join(__dirname, "../public");
  const data = await fileHandler.readFile(`${publicPath}/sign-in.html`);

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(data);
};

module.exports = {
  getSignInPage
};
