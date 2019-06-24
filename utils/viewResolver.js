const path = require('path');
const fileUtil = require('./file-system');
const csvParser = require('../utils/csv-parser');

const getRegExp = (value) => {
  return `/\$[\{]${value}[\}]/g`;
}

const getUserTodo = async (userID) => {
  const allTodoData = await csvParser.getKeyValueObj('./db/todoList.csv');
  const userData = Object.keys(allTodoData).reduce((acc, key) => {
    if (allTodoData[key]['userID'] === userID) {
      const obj = {};
      obj[key] = allTodoData[key];
      acc.push(obj);
    }
    return acc;
  },[])
  return userData;
}

const createHtmlObj = (userDataArr) => {
  const htmlObj = {'todo' : '', 'doing' : '', 'done' : ''};
  userDataArr.forEach((contentObj) => {
    const cardNo = Object.keys(contentObj)[0];
    const cardType = contentObj[cardNo]['type'];
    const cardContent = contentObj[cardNo]['content'];
    htmlObj[cardType] += `<section class="card ${cardType}" data-no="${cardNo}" draggable="true"><img src="img/exit.png" alt="exit-image" class="card-image-exit">${cardContent}</section>`
  })
  return htmlObj;
}

const view = async (userID, fileName) => {
  const publicPath = path.join(__dirname, '../public')
  let staticHtml = await fileUtil.readFile(`${publicPath}/${fileName}`);
  const userDataArr = await getUserTodo(userID);
  const htmlObj = createHtmlObj(userDataArr);

  staticHtml = staticHtml.replace(/\$[\{]userID[\}]/g, userID);
  staticHtml = staticHtml.replace(/\$[\{]todo[\}]/g, htmlObj['todo']);
  staticHtml = staticHtml.replace(/\$[\{]doing[\}]/g, htmlObj['doing']);
  staticHtml = staticHtml.replace(/\$[\{]done[\}]/g, htmlObj['done']);

  return staticHtml;
}

module.exports = view;