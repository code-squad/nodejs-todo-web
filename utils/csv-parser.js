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

const getKeyValue = async (path) => {
  const splitData = await getRawData(path);
  const keyArr = splitData[0].split(',');
  
  const objData = splitData.reduce((acc, data, index) => {
    if (index === 0) return acc;
    const oneDataArr = data.split(',');
    
    const obj = {};
    oneDataArr.forEach((info, idx) => {
      obj[keyArr[idx]] = info;
    });
    acc = obj;
    return acc;
  }, {});
  
  return objData;
}

const appendData = async (path, dataStr) => {
  await fileHandler.appendFile(path, dataStr);
}

const keyObjToCsvStr = (dataObj) => {
  let title = '';
  let data = '';
  Object.keys(dataObj).forEach((key, index) => {
    if (index === 0) {
      title += key;
      data += dataObj[key];
    } else {
      title += `,${key}`;
      data += `,${dataObj[key]}`
    }
  })

  const csvStr = title + '\r\n' + data;
  return csvStr;
}

module.exports = {
  getKeyValueObj,
  keyObjToCsvStr,
  getKeyValue,
  appendData
}