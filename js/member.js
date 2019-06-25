const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(`${__dirname}/../data/member.json`);
const memberDB = low(adapter);

memberDB.defaults({ members: [] }).write();

const isValidMember = loginData => {
	const { user_id, user_password } = JSON.parse(loginData);

	const member = memberDB
		.get('members')
		.find({ user_id, user_password })
		.value();

	if (!member) {
		return false;
	}
	const user_sid = makeSessionId();
	memberDB.set(`members.${user_id}.user_sid`, user_sid).write();

	return { user_id, user_sid };
};

const makeSessionId = () => {
	const min = 10000000000000000;
	const max = 99999999999999999;

	return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = { isValidMember };
