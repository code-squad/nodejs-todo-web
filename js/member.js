const cookie = require('cookie');
const db = require('./db.js');

const login = loginData => {
	const memberInfo = db.getUserInfo(loginData);

	if (!memberInfo) {
		return false;
	}
	const user_id = memberInfo.user_id;
	const user_sid = makeSessionId();
	db.setUserSid(user_id, user_sid);

	return { user_id, user_sid };
};

const logout = requestCookie => {
	const cookies = cookie.parse(requestCookie);
	db.resetUserSid(cookies);
};

const signUp = signUpData => {
	const { user_id, user_password } = JSON.parse(signUpData);
	const duplicatedId = db.checkDuplicatedId(user_id);

	if (duplicatedId) {
		return false;
	}
	const user_sid = makeSessionId();
	db.createUserInfo({ user_id, user_password, user_sid });

	return user_sid;
};

const getUserId = requestCookie => {
	const cookies = cookie.parse(requestCookie);
	return db.getUserId(cookies);
};

const makeSessionId = () => {
	const min = 10000000000000000;
	const max = 99999999999999999;

	return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = { login, signUp, getUserId, logout };
