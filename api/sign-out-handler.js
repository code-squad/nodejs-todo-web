const db = require("./db-handler");

const removeCookieStr = req => {
  const cookieString = `sid=''; Max-age=0`;
  return cookieString;
};

const signOut = () => async (req, res, next) => {
  const sid = req.session.sid;
  const sessionId = db
    .get("session")
    .find({ sid: sid })
    .value();
  if (sessionId) {
    db.get("session")
      .remove({ sid: sid })
      .write();
  }

  const cookieStr = removeCookieStr(req);
  res.writeHead(302, {
    "Set-Cookie": [cookieStr],
    Location: "/"
  });

  res.end();
};

module.exports = {
  signOut
};
