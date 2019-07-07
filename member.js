const memberDB = require('./memberDB.js');
const sessionStorage = require('./session-manage.js');

const login = loginData => {
	const memberInfo = memberDB.getUserInfo(loginData);

	if (!memberInfo) {
		return false;
	}
	const user_id = memberInfo.user_id;
	const user_sid = sessionStorage.setSession(user_id);

	return user_sid;
};

const logout = sid => {
	sessionStorage.deleteSession(sid);
};

const signUp = signUpData => {
	const { user_id, user_password } = JSON.parse(signUpData);
	const duplicatedId = memberDB.checkDuplicatedId(user_id);

	if (duplicatedId) {
		return false;
	}
	memberDB.createUserInfo({ user_id, user_password });
	const user_sid = login(signUpData);

	return { user_sid, user_id };
};

const getUserId = sid => {
	const user_id = sessionStorage.getUserId(sid);
	return user_id;
};

module.exports = { login, signUp, getUserId, logout };
