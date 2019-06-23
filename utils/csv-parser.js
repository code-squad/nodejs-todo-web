const fileHandler = require('./file-system');

const getRawData = async (csvPath) => {
  const rawData = await fileHandler.readFile(csvPath);
  const data = rawData.split("\r\n");
  return data;
}

const getKeyValueObj = async (path) => {
  const splitData = await getRawData(path);
  const keyArr = splitData[0].split(',');

  const objData = splitData.reduce((acc, data, index) => {
    if (index === 0) return acc;
    const oneDataArr = data.split(',');

    const obj = {};
    oneDataArr.forEach((info, idx) => {
      if (idx === 0) return;
      obj[keyArr[idx]] = info;
    });

    acc[oneDataArr[0]] = obj;
    return acc;
  }, {});

  return objData;
}

const addDataObj = async (id, dataObj) => {
  const obj = await getKeyValueObj('./db/todoList.csv');
  const {
    data,
    type
  } = dataObj;

  if (obj[id][type] === '') {
    obj[id][type] += `${data}`;
  } else {
    obj[id][type] += `&${data}`;
  }

  const csvData = objToCsvStr(obj);
  await fileHandler.writeFile('./db/todoList.csv', csvData);
  return "success";
}

const objToCsvStr = (dataObj) => {
  let str = 'id,todo,doing,done\r\n';

  Object.keys(dataObj).forEach((key, index) => {
    let id = `\r\n${key},`
    if (index === 0) {
      id = `${key},`
    }
    str += id;
    str += `${dataObj[key]['todo']},`
    str += `${dataObj[key]['doing']},`
    str += `${dataObj[key]['done']}`
  });

  return str;
}

module.exports = {
  getKeyValueObj,
  addDataObj,
}