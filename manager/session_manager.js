class SessionMananger {
    constructor(utilCookies) {
        this.utilCookies = utilCookies;
        this.sessionTable = new Map();
        this.second = 60;
        this.minute = 60;
        this.hour   = 24;
        this.day    = 30;
    }

    createSession(inputID) {
        let sessionID = 0;
        while (true) {
            const min = 1e15, max = Number.MAX_SAFE_INTEGER;
            sessionID = String(Math.floor(Math.random() * (max - min + 1)));
            if (!this.sessionTable.has(sessionID)) {
                this.sessionTable.set(sessionID, JSON.stringify({ id : inputID, date : new Date()}));
                console.log(`Session Table Size : ${this.sessionTable.size}`);
                break;
            }
        }
        return sessionID;
    }

    getSession(cookie) {
        return this.utilCookies.parse(cookie).SID
    }

    deleteSession(sessionID) {
        this.sessionTable.delete(sessionID);
    }

    getValue(sessionID) {
        return this.sessionTable.get(sessionID);
    }

    getMaxAge() {
        return this.second * this.minute * this.hour * this.day;
    }

    isValid(cookie) {
        if (cookie === undefined) return false;
        const sessionID = this.getSession(cookie);
        if (this.sessionTable.has(sessionID)) {
            const initMS    = new Date(JSON.parse(this.getValue(sessionID)).date).getTime();
            const currentMS = new Date().getTime();
            const limitMS   = 18e5;
            if (Math.abs(currentMS - initMS) > limitMS) {
                this.deleteSession(sessionID);
                return false;
            }
        } else return false;
        return true;
    }
}

module.exports = SessionMananger;