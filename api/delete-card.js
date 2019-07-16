const db = require("./db-handler");

const deleteCard = () => async (req, res, next) => {
  const { cardId } = req.body;
  const sid = req.session.sid;
  const id = db
    .get("session")
    .find({ sid: sid })
    .value().id;
  const userIdx = getIdxOfUser(id);
  const deleteResult = await deleteCardInDb(userIdx, cardId);
  if (deleteResult === "success") {
    res.writeHead(200, "Content-Type", "text/plain");
    res.end('success');
  }
};

const deleteCardInDb = (userIdx, cardId) => {
  return new Promise(resolve => {
    db.get(`userData[${userIdx}].cards`)
      .remove({ id: parseInt(cardId) })
      .write();
    resolve("success");
  });
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
  deleteCard
};
