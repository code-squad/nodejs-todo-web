module.exports = class Session{
    constructor(){
        this.sessionList = sessionList;
    }

    isValidSessionID(sessionID){
        if(sessionID in this.sessionList){
            return true;
        }
        return false;
    }

    getSessionID(userInfo){
        const sessionID = Math.floor(Math.random() * 10000000000000000) + 1000000000000000;
        if(sessionID in this.sessionList){
            return this.getSessionID(userInfo);
        }

        this.sessionList[sessionID] = userInfo.id;
        return sessionID;
    }
}

sessionList = {};