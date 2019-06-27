const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(`${__dirname}/../data/member.json`);
const memberDB = low(adapter);

memberDB.defaults({ members: [] }).write();

const getUserInfo = loginData => {
	const { user_id, user_password } = JSON.parse(loginData);
	const memberInfo = memberDB
		.get('members')
		.find({ user_id, user_password })
		.value();

	return memberInfo;
};

const resetUserSid = cookies => {
	memberDB
		.get('members')
		.find({ user_sid: Number(cookies.sid) })
		.set('user_sid', '')
		.write();
};

const checkDuplicatedId = user_id => {
	const duplicatedId = memberDB
		.get('members')
		.find({ user_id })
		.value();

	return duplicatedId;
};

const createUserInfo = signUpData => {
	const { user_id, user_password, user_sid } = signUpData;
	memberDB
		.get('members')
		.push({ user_id, user_password, user_sid })
		.write();
};

const setUserSid = (user_id, user_sid) => {
	memberDB
		.get('members')
		.find({ user_id })
		.set('user_sid', user_sid)
		.write();
};

const getUserId = cookies => {
	const member = memberDB
		.get('members')
		.find({ user_sid: Number(cookies.sid) })
		.value();

	if (!member) {
		return false;
	}
	return member.user_id;
};

module.exports = { getUserInfo, setUserSid, getUserId, resetUserSid, checkDuplicatedId, createUserInfo };
