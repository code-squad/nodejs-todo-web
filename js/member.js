const cookie = require('cookie');
const db = require('./db.js');

const login = loginData => {
	const memberInfo = db.isValidMember(loginData);

	if (!memberInfo) {
		return false;
	}
	const user_id = memberInfo.user_id;
	const user_sid = makeSessionId();
	db.setUserSid(user_id, user_sid);

	return { user_id, user_sid };
};

const signUp = data => {
	const { user_id, user_password } = JSON.parse(data);

	const duplicatedId = memberDB
		.get('members')
		.find({ user_id })
		.value();

	if (duplicatedId) {
		return false;
	}
	const user_sid = makeSessionId();
	memberDB
		.get('members')
		.push({ user_id, user_password, user_sid })
		.write();

	return user_sid;
};

const isValidLoggedIn = requestCookie => {
	const cookies = cookie.parse(requestCookie);

	const member = memberDB
		.get('members')
		.find({ user_sid: Number(cookies.sid) })
		.value();
	if (!member) {
		return false;
	}
	return true;
};

const makeSessionId = () => {
	const min = 10000000000000000;
	const max = 99999999999999999;

	return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = { login, signUp, isValidLoggedIn };
