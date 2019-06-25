const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../data/member.json');
const members = low(adapter);

members.defaults({ members: [] }).write();
