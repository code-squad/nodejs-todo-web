const view = require('../utils/viewResolver');
const csvParser = require('../utils/csv-parser');
const fileHandler = require('../utils/file-system');

const getPage = () => async (req, res, next) => {

  if (req.session === 'false') {
    res.writeHead(302, { 'Location': '/' });
    res.end();
    return;
  }
  const userID = req.session.userID;
  const viewer = await view(userID, 'index.html');

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(viewer);
  res.end();
}

module.exports = {
  getPage,
  addTodo
}