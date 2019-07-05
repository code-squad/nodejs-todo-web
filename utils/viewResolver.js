const path = require('path');
const fileUtil = require('./file-system');
const csvParser = require('../utils/csv-parser');

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

const getSequenceObj = async (userID) => {
  const allSequence = await csvParser.getKeyValueObj('./db/todo-sequence.csv');
  const userCardSequence = allSequence[userID];

  if (!userCardSequence) {
    return {};
  }
  
  const sequeceObj = {};
  Object.keys(userCardSequence).forEach((key) => {
    const sequenceArr = userCardSequence[key].split('#');
    sequenceArr.splice(sequenceArr.length-1,1);
    
    const cardNoObj = {};
    let i = 0;
    sequenceArr.forEach((cardNo) => {
      cardNoObj[cardNo] = i;
      i++;
    })
    sequeceObj[key] = cardNoObj;
  });
  return sequeceObj;
}

const createHtmlObj = (userDataArr, sequeceObj) => {
  const htmlObj = {'todo' : '', 'doing' : '', 'done' : ''};
  
  userDataArr.forEach((contentObj) => {
    const cardNo = Object.keys(contentObj)[0];
    contentObj[cardNo]['cardNo'] = cardNo;
    const cardType = contentObj[cardNo]['type'];
    contentObj[cardNo]['sequence'] = sequeceObj[cardType][cardNo];
    sequeceObj[cardType][cardNo] = contentObj[cardNo];
  })

  Object.keys(sequeceObj).forEach((key) => {
    const cardObj = sequeceObj[key];
    
    Object.keys(cardObj).forEach((cardNo) => {
      const newKey = cardObj[cardNo]['sequence'];
      cardObj[newKey] = cardObj[cardNo];
      delete cardObj[cardNo];
    })

    Object.entries(cardObj).forEach(([no, valueObj]) => {
      const cardType = valueObj['type'];
      const cardContent = valueObj['content'];
      const cardNo = valueObj['cardNo']
      htmlObj[cardType] += `<section class="card ${cardType}" data-no="${cardNo}" draggable="true"><img src="img/exit.png" alt="exit-image" class="card-image-exit">${cardContent}</section>`
    });
  })


  return htmlObj;
}

const view = async (userID, fileName) => {
  const publicPath = path.join(__dirname, '../public')
  let staticHtml = await fileUtil.readFile(`${publicPath}/${fileName}`);
  staticHtml = staticHtml.toString('utf8');
  
  const userDataArr = await getUserTodo(userID);
  const sequeceObj = await getSequenceObj(userID);
  const htmlObj = createHtmlObj(userDataArr, sequeceObj);

  staticHtml = staticHtml.replace(/\$[\{]userID[\}]/g, userID);
  staticHtml = staticHtml.replace(/\$[\{]todo[\}]/g, htmlObj['todo']);
  staticHtml = staticHtml.replace(/\$[\{]doing[\}]/g, htmlObj['doing']);
  staticHtml = staticHtml.replace(/\$[\{]done[\}]/g, htmlObj['done']);

  return staticHtml;
}

module.exports = view;