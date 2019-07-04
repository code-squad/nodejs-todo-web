const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(`${__dirname}/../data/member.json`);
const memberDB = low(adapter);

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
	signUpData['user_sid'] = '';
	const { user_id, user_password, user_sid } = signUpData;

	memberDB
		.defaults({ members: [] })
		.get('members')
		.push({ user_id, user_password, user_sid })
		.write();
};

const setUserSid = user_id => {
	const user_sid = makeSessionId();
	memberDB
		.get('members')
		.find({ user_id })
		.set('user_sid', user_sid)
		.write();

	return user_sid;
};

const getMemberList = () => {
	const memberList = memberDB
		.defaults({ members: [] })
		.get('members')
		.value();

	return memberList;
};

const getUserId = sid => {
	const memberList = getMemberList();

	if (!memberList) {
		return false;
	}
	const userInfo = memberList.filter(member => {
		return member.user_sid === Number(sid);
	});
	return userInfo[0].user_id;
};

const makeSessionId = () => {
	const min = 10000000000000000;
	const max = 99999999999999999;

	return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = { getUserInfo, setUserSid, getUserId, resetUserSid, checkDuplicatedId, createUserInfo };
