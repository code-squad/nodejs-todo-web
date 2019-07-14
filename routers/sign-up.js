const path = require("path");
const fileHandler = require("../api/file-handler");

const getSignUpPage = () => async (req, res, next) => {
  const publicPath = path.join(__dirname, "../public");
  const data = await fileHandler.readFile(`${publicPath}/sign-up.html`);

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(data);
};

module.exports = {
  getSignUpPage
};
