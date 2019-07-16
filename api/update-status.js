const db = require("./db-handler");

const updateStatus = () => async (req, res, next) => {
  const { dragTargetCardId, newStatus, dropTargetCardId } = req.body;
  const sid = req.session.sid;
  const id = db
    .get("session")
    .find({ sid: sid })
    .value().id;
  const userIdx = getIdxOfUser(id);
  const updateResult = await updateStatusInDb(
    userIdx,
    dragTargetCardId,
    newStatus
  );
  const sortedList = await sortList(
    userIdx,
    dragTargetCardId,
    dropTargetCardId
  );
  if (updateResult === "success" && sortedList) {
    db.get(`userData[${userIdx}].cards`)
      .assign(sortedList)
      .write();
    res.writeHead(200, "Content-Type", "text/plain");
    res.end("success");
  }
};

const updateStatusInDb = (userIdx, dragTargetCardId, newStatus) => {
  return new Promise(resolve => {
    db.get(`userData[${userIdx}].cards`)
      .find({ id: parseInt(dragTargetCardId) })
      .assign({ status: newStatus })
      .write();
    resolve("success");
  });
};

const sortList = (userIdx, dragTargetCardId, dropTargetCardId) => {
  return new Promise(resolve => {
    const userData = db.get(`userData[${userIdx}].cards`).value();
    const dragTargetCard = db
      .get(`userData[${userIdx}].cards`)
      .find({ id: parseInt(dragTargetCardId) })
      .value();
    const dropTargetCard = db
      .get(`userData[${userIdx}].cards`)
      .find({ id: parseInt(dropTargetCardId) })
      .value();
    const dragTargetCardIdx = userData.indexOf(dragTargetCard);
    userData.splice(dragTargetCardIdx, 1);
    let dropTargetCardIdx = userData.indexOf(dropTargetCard);
    if (dropTargetCard === undefined) {
      dropTargetCardIdx = userData.length;
    }
    userData.splice(dropTargetCardIdx, 0, dragTargetCard);

    resolve(userData);
  });
};

const getIdxOfUser = id => {
  const targetuserData = db
    .get("userData")
    .find({ id: id })
    .value();
  return db
    .get("userData")
    .value()
    .indexOf(targetuserData);
};

module.exports = {
  updateStatus
};
