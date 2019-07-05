const cookie = require('cookie');
const memberDB = require('./memberDB.js');

const login = loginData => {
	const memberInfo = memberDB.getUserInfo(loginData);

	if (!memberInfo) {
		return false;
	}
	const user_id = memberInfo.user_id;
	const user_sid = memberDB.setUserSid(user_id);

	return user_sid;
};

const logout = requestCookie => {
	const cookies = cookie.parse(requestCookie);
	memberDB.resetUserSid(cookies);
};

const signUp = signUpData => {
	const { user_id, user_password } = JSON.parse(signUpData);
	const duplicatedId = memberDB.checkDuplicatedId(user_id);

	if (duplicatedId) {
		return false;
	}
	memberDB.createUserInfo({ user_id, user_password });
	const user_sid = memberDB.setUserSid(user_id);

	return { user_sid, user_id };
};

const getUserId = requestCookie => {
	const cookies = cookie.parse(requestCookie);
	const user_id = memberDB.getUserId(cookies.sid);

	return user_id;
};

module.exports = { login, signUp, getUserId, logout };
