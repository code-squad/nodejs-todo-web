const csvParser = require('../utils/csv-parser');
const view = require('../utils/viewResolver');

const createCard = (dataOBj) => {

  if (dataOBj === undefined) {
    return '';
  }

  return Object.keys(dataOBj).reduce((acc, contentType) => {
    if (dataOBj[contentType] === '') {
      return acc;
    }
    const htmlString = dataOBj[contentType].split('&').reduce((acc,content) => {
      const string = `<section class="card ${contentType}" draggable="true"><img src="img/exit.png" alt="exit-image" class="card-image-exit">${content}</section>`
      acc += string;
      return acc;
    },'');

    acc[contentType] = htmlString;
    return acc;
  }, {});
}

const getCard = (cardObj, type) => {
  return cardObj.hasOwnProperty(type) ? cardObj[type] : null
};

const getPage = () => async (req, res, next) => {

  if (req.session === 'false') {
    res.writeHead(302, {'Location': '/' });
    res.end();
    return;
  }

  const todoData = await csvParser.getKeyValueObj('./db/todoList.csv');
  const userID = req.session.userID;

  const dataOBj = {
    'userID' : userID,
    'todoData' : todoData[userID]
  }

  if (dataOBj['todoData'] === undefined) {
    const cardObj = createCard(dataOBj.todoData);
    const viewResolverObj = {
      'userID' : userID,
      'todo' : getCard(cardObj, 'todo'),
      'doing' : getCard(cardObj, 'doing'),
      'done' : getCard(cardObj, 'done'),
    }

    const viewer = await view(viewResolverObj, 'index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(viewer);
    res.end();
    return;
  }
  
  const cardObj = createCard(dataOBj.todoData);
  const viewResolverObj = {
    'userID' : userID,
    'todo' : getCard(cardObj, 'todo'),
    'doing' : getCard(cardObj, 'doing'),
    'done' : getCard(cardObj, 'done'),
  }

  const viewer = await view(viewResolverObj, 'index.html');
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(viewer);
  res.end();
}

module.exports = {
  getPage
}