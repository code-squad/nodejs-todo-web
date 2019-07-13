const sessionDb = require("../db/session-db");

const session = () => (req, res, next) => {
  const cookie = req.headers.cookie;
  if (cookie === undefined) {
    req.session = "false";
    next();
    return;
  }
  const sid = cookie.split("sid=")[1];

  if (sessionDb[sid]) {
    req.session = {
      sid: sid
    };
  }

  next();
};

module.exports = session;
