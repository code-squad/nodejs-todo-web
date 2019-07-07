const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const memberDB = low(new FileSync('./db/member.json'));

const getUserInfo = loginData => {
	const { user_id, user_password } = JSON.parse(loginData);
	const memberInfo = memberDB
		.get('members')
		.find({ user_id, user_password })
		.value();

	return memberInfo;
};

const checkDuplicatedId = user_id => {
	const duplicatedId = memberDB
		.get('members')
		.find({ user_id })
		.value();

	return duplicatedId;
};

const createUserInfo = signUpData => {
	const { user_id, user_password } = signUpData;

	memberDB
		.defaults({ members: [] })
		.get('members')
		.push({ user_id, user_password })
		.write();
};

module.exports = { getUserInfo, checkDuplicatedId, createUserInfo };
