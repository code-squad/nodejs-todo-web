const db = require("./db-handler");

const getClassifiedCards = () => async (req, res, next) => {
  const sid = req.session.sid;
  const id = db
    .get("session")
    .find({ sid: sid })
    .value().id;
  const userIdx = getIdxOfUser(id);
  const classifiedCards = await classifyCards(userIdx);

  res.writeHead(200, "Content-Type", "application/json");
  res.end(JSON.stringify(classifiedCards));
};

const classifyCards = userIdx => {
  return new Promise(resolve => {
    const cards = db.get(`userData[${userIdx}].cards`).value();
    const todoCards = cards.filter(v => {
      return v.status === "todo";
    });
    const doingCards = cards.filter(v => {
      return v.status === "doing";
    });
    const doneCards = cards.filter(v => {
      return v.status === "done";
    });
    resolve({ todoCards, doingCards, doneCards });
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
  getClassifiedCards
};
