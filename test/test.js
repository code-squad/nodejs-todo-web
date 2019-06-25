const assert = require('assert');
const member = require('../js/member.js');

describe('Member', function() {
	describe('#isValidMember() : 로그인', function() {
		it('유효한 회원일 경우', function() {
			const memberData = { user_id: 'abc', user_password: 'abc' };
			assert.equal(member.isValidMember(JSON.stringify(memberData)), true);
		});
		it('유효하지 않은 회원일 경우', function() {
			const memberData = { user_id: 'abcd', user_password: 'abc' };
			assert.equal(member.isValidMember(JSON.stringify(memberData)), false);
		});
	});
});
