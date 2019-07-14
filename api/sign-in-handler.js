const crypto = require("./crypto");
const db = require("./db-handler");

const checkId = (id, password) => {
  const matchedId = db
    .get("userData")
    .find({ id: id })
    .value();
  if (matchedId === undefined) return false;
  const isValidPw = checkPassword(id, password);
  return isValidPw;
};

const checkPassword = (id, pw) => {
  const matchedPw = db
    .get("userData")
    .find({ id: id })
    .value().pw;
  return matchedPw === pw;
};

const setCookieStr = req => {
  const cookieString = `sid=${req.session.sid}; Max-age=${60 * 60 * 24 * 30}`;
  return cookieString;
};

const signIn = () => async (req, res, next) => {
  const { id, password } = req.body;
  const isValidId = checkId(id, password);

  if (isValidId) {
    const sid = await crypto.cryptoHash(id);
    req["session"] = {
      sid: sid
    };
    db.get("session")
      .push({ sid: sid, id: id })
      .write();
    const cookieStr = setCookieStr(req);
    res.writeHead(302, { "Set-Cookie": [cookieStr], Location: "/todo" });
    res.end();
  } else {
    res.writeHead(302, { Location: "/" });
    res.end();
  }

  next();
};

module.exports = {
  signIn
};
