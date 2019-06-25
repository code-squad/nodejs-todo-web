const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../data/member.json');
const members = low(adapter);

members.defaults({ members: [] }).write();

const makeSessionId = () => {
	const min = 10000000000000000;
	const max = 99999999999999999;

	return Math.floor(Math.random() * (max - min + 1)) + min;
};
