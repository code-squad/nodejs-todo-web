const db = require("./db-handler");

const editCard = () => async (req, res, next) => {
  const { cardId, newTitle } = req.body;
  const sid = req.session.sid;
  const id = db
    .get("session")
    .find({ sid: sid })
    .value().id;
  const userIdx = getIdxOfUser(id);
  const editResult = await editCardInDb(userIdx, cardId,newTitle);
  if (editResult === "success") {
    res.writeHead(200, "Content-Type", "text/plain");
    res.end("success");
  }
};

const editCardInDb = (userIdx, cardId,newTitle) => {
  return new Promise(resolve => {
    db.get(`userData[${userIdx}].cards`)
      .find({ id: parseInt(cardId) })
      .assign({ title: newTitle })
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
  editCard
};
