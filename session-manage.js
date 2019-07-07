class SessionManage {
	constructor() {
		this.sessionStorage = new Map();
	}

	getSessionStorage() {
		return this.sessionStorage.entries();
	}

	setSession(userId) {
		let sid = this.makeSessionId();

		while (this.sessionStorage.has(sid)) {
			sid = this.makeSessionId();
		}
		this.sessionStorage.set(sid, userId);

		return sid;
	}

	deleteSession(sid) {
		this.sessionStorage.delete(sid);
	}

	getUserId(sid) {
		if (this.sessionStorage.has(Number(sid))) {
			return this.sessionStorage.get(Number(sid));
		}
		throw new Error('INVALID_ACCESS');
	}

	makeSessionId() {
		const min = 1000000000000000;
		const max = 9999999999999999;

		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

const sessionManage = new SessionManage();

module.exports = sessionManage;
