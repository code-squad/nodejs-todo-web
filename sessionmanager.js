class SessionManager {
  constructor() {
    this.sessionStorage = new Map();
    // this.maxAge = 1 * 60 * 60 * 1000;
    this.maxAge = 60 * 1000;
  }

  setSession(sessionId, userId, establishedTime) {
    this.sessionStorage.set(sessionId, {userId, establishedTime});
  }

  isValidSession(sessionId) {
    return this.sessionStorage.has(sessionId) && 
    (new Date().getTime()) - this.sessionStorage.get(sessionId).establishedTime.getTime() <= this.maxAge;
  }

  getMaxAge() {
    return this.maxAge / 1000;
  }
}

const sessionManager = new SessionManager();


module.exports= sessionManager;