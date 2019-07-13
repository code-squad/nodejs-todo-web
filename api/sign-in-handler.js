const dbHandler = require("./db-handler");
const crypto = require("./crypto");
const sessionDb = require("../db/session-db");
const path = require("path");

const getListFilter = (userData, id, password) => {
  return userData.filter(object => {
    return object[id] === password;
  });
};

const findMatchedId = (userData, id) => {
  return new Promise(resolve => {
    const matchedId = getListFilter(userData, "id", id)[0];
    resolve(matchedId !== undefined);
  });
};

const checkPassword = (userData, pw) => {
  return new Promise(resolve => {
    const matchedPw = getListFilter(userData, "pw", pw)[0];
    resolve(matchedPw !== undefined);
  });
};

const setCookieStr = req => {
  const cookieString = `sid=${req.session.sid}; Max-age=${60 * 60 * 24 * 30}`;
  return cookieString;
};

const signIn = () => async (req, res, next) => {
  const { id, password } = req.body;
  const publicPath = path.join(__dirname, "../db");
  const userDb = await dbHandler.readFile(`${publicPath}/user-db.json`);
  const userData = JSON.parse(userDb)["userData"];
  const isValidId = await findMatchedId(userData, id);
  const isValidPw = await checkPassword(userData, password);

  if (isValidId && isValidPw) {
    const sid = await crypto.cryptoHash(id);
    req["session"] = {
      sid: sid
    };
    sessionDb[sid] = {
      userId: id
    };
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
