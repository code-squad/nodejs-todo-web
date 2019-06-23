const csvParser = require('../utils/csv-parser');

const addCard = () => async (req, res, next) => {
  const {data, type} = req.body;
  const userID = req.session.userID;

  const addObj = {
    'data' : data,
    'type' : type
  }
  console.log(addObj);

  const answer = await csvParser.addDataObj(userID, addObj);

  if (answer === 'success') {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.write('success');
    res.end();
  } else {
    return;
  } 
}

module.exports = {
  addCard,
}