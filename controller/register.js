const path = require('path');
const fileUtil = require('../utils/file-system');
const csvParser = require('../utils/csv-parser');

const getPage = () => async (req, res, next) => {
  const publicPath = path.join(__dirname, '../public')
  const data = await fileUtil.readFile(`${publicPath}/register.html`);

  res.writeHead(200, {'Content-Type' : 'text/html'});
  res.end(data)
}

const checkDupleId = () => async (req, res, next) => {
  const inputId = req.url.split('/')[2];
  const allTodoData = await csvParser.getKeyValueObj('./db/user.csv');

  res.writeHead(200, {'Content-Type' : 'text/plain'});
  
  if (allTodoData[inputId]) {
    res.write('deny');
  } else {
    res.write('success');
  }
  res.end();
}

const isDupleId = async (inputId) => {
  const allTodoData = await csvParser.getKeyValueObj('./db/user.csv');

  if (allTodoData[inputId]) {
    return true;
  }

  return false;
}

const submitRegisterInfo = () => async (req, res, next) => {
  const {id, password} = (req.body);
  const csvDataStr = `\r\n${id},${password}`;

  const isDupleID = await isDupleId(id);

  if (isDupleID) {
    console.error('id is duplicated')
    return;
  }

  await fileUtil.appendFile('./db/user.csv', csvDataStr);
  res.writeHead(302, { 'Location': '/' });
  res.end();
}

module.exports = {
  getPage,
  checkDupleId,
  submitRegisterInfo
}