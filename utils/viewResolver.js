const path = require('path');
const fileUtil = require('./file-system');

const getRegExp = (value) => {
  return `/\$[\{]${value}[\}]/g`;
}

const view = async (dataObj) => {
  
  const publicPath = path.join(__dirname, '../public')
  let data = await fileUtil.readFile(`${publicPath}/index.html`);
  
  // Object.keys(dataObj).forEach(async (targetData) => {
  //   const regExp = getRegExp(targetData);
  //   htmlPage = htmlPage.replace(regExp, dataObj[targetData]);
  //   console.log(htmlPage)
  // });

  // 리팩토링 필요, reduce 함수 동작 하지 않는데 왜지? 스코프가 다른가?
  data = data.replace(/\$[\{]userID[\}]/g, dataObj['userID'] || '');
  data = data.replace(/\$[\{]todo[\}]/g, dataObj['todo'] || '');
  data = data.replace(/\$[\{]doing[\}]/g, dataObj['doing'] || '');
  data = data.replace(/\$[\{]done[\}]/g, dataObj['done'] || '');

  return data;
}

module.exports = view;