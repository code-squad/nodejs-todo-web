const db = require("./db-handler");

const signUp = () => (req, res, next) => {
  const { id, password, password2 } = req.body;
  const isBlankId = isBlankInput(id);
  const isBlankPassword = isBlankInput(password);
  const isDuplicatedId = checkDuplicatedID(id);
  const isValidPassword = checkValidPassword(password, password2);

  if (isDuplicatedId || !isValidPassword || isBlankId || isBlankPassword) {
    res.writeHead(302, { Location: "/sign-up" });
    res.end();
  } else {
    db.get("userData")
      .push({ id: id, pw: password, cards: [] })
      .write();
    res.writeHead(302, { Location: "/" });
    res.end();
  }
};

const checkDuplicatedID = id => {
  const isDuplicatedId = db
    .get("userData")
    .find({ id: id })
    .value();
  return isDuplicatedId !== undefined;
};

const checkValidPassword = (password, password2) => {
  return password === password2;
};

const isBlankInput = input => {
  return input === "";
};

module.exports = {
  signUp
};
