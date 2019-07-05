const getRawData = (dataArr, req) => req.on('data', data => {
  return new Promise((resolve, reject) => {
    const bodyStringArr = data.toString('utf8').split('&');
    bodyStringArr.forEach(data => {
      dataArr.push(data);
    })
    resolve(dataArr);
  })
});

const getBodyObj = (dataArr) => {
  return dataArr.reduce((acc, str) => {
    const keyValue = str.split('=');
    acc[keyValue[0]] = keyValue[1];
    return acc;
  }, {})
}

const bodyParser = () => async (req, res, next) => {
  const dataArr = [];
  await getRawData(dataArr, req);
  const bodyData = getBodyObj(dataArr);
  req['body'] = bodyData;
  next();
}

module.exports = bodyParser;