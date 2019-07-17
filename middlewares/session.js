const db = require("../api/db-handler");

const session = () => (req, res, next) => {
  const cookie = req.headers.cookie;

  if (cookie === undefined) {
    req.session = "false";
    next();
    return;
  }
  const sid = cookie.split("sid=")[1];
  const sessionId = db
    .get("session")
    .find({ sid: sid })
    .value();

  if (sessionId) {
    req.session = {
      sid: sid
    };
  }

  next();
};

module.exports = session;
