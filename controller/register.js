const path = require('path');
const fileUtil = require('../utils/file-system');

const getPage = () => async (req, res, next) => {
  const publicPath = path.join(__dirname, '../public')
  const data = await fileUtil.readFile(`${publicPath}/register.html`);

  res.writeHead(200, {'Content-Type' : 'text/html'});
  res.end(data)
}


module.exports = {
  getPage,
}