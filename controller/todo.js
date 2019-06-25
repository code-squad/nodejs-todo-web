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

const updateTodoKey = async (keyObj) => {
  keyObj.cardKey++;
  const csvData = csvParser.keyObjToCsvStr(keyObj);
  await fileHandler.writeFile('./db/keys.csv', csvData);
}

const addTodo = () => async (req, res, next) => {
  const {data, type} = req.body;
  const userID = req.session.userID;
  let keyObj = await csvParser.getKeyValue('./db/keys.csv');
  const cardKey = keyObj.cardKey;
  
  const dataStr = `\r\n${cardKey},${type},${data},${userID}`;
  
  await csvParser.appendData('./db/todoList.csv', dataStr);
  await updateTodoKey(keyObj);

  res.writeHead(200, {'Content-Type' : 'text/plain'});
  res.write(cardKey);
  res.end();
}

const deleteTodo = () => async (req, res, next) => {
  const cardNo = req.url.split('/')[2];
  const allTodoData = await csvParser.getKeyValueObj('./db/todoList.csv');
  delete allTodoData[cardNo];

  const dataStr = Object.keys(allTodoData).reduce((acc, key) => {
    const data = allTodoData[key];
    const string = `${key},${data['type']},${data['content']},${data['userID']}`;
    acc += `\r\n${string}`;
    return acc;
  },`cardNo,type,content,userID`);

  await fileHandler.writeFile('./db/todoList.csv', dataStr);

  res.writeHead(200, {'Content-Type' : 'text/plain'});
  res.write('success');
  res.end();
}

module.exports = {
  getPage,
  addTodo,
  deleteTodo
}