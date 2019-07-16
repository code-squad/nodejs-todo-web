const db = require("./db-handler");

const addNewCard = () => async (req, res, next) => {
  const { title, status } = req.body;
  const sid = req.session.sid;
  const id = db
    .get("session")
    .find({ sid: sid })
    .value().id;
  const userIdx = getIdxOfUser(id);
  const addCard = await addCardToDb(userIdx, title, status);

  res.writeHead(200, "Content-Type", "text/plain");
  res.end(JSON.stringify(addCard));
};

const addCardToDb = (userIdx, title, status) => {
  return new Promise(resolve => {
    const newCardId = makeId();
    const newCard = {
      id: newCardId,
      title: title,
      status: status
    };
    db.get(`userData[${userIdx}].cards`)
      .push(newCard)
      .write();
    resolve(newCard);
  });
};

const makeId = () => {
  return Math.floor(Math.random() * 10000) + 1;
};

const getIdxOfUser = id => {
  const targetUserData = db
    .get("userData")
    .find({ id: id })
    .value();
  return db
    .get("userData")
    .value()
    .indexOf(targetUserData);
};

module.exports = {
  addNewCard
};
