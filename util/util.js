class Util {

    constructor() {
        this.session = {};
    }

    makeSession(userID) {
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 15);
        const randomInt = +new Date();

        Object.entries(this.session).filter(session => session[1].id === userID).map(session => session[0]).forEach(key => {
            delete this.session[key];
        });
        this.session[randomInt] = {
            id: userID,
            expires
        };

        return { randomInt, expires };
    }

    parseCookies(cookie = '') {
        return cookie
            .split(';')
            .map(v => v.split('='))
            .map(([k, ...vs]) => [k, vs.join('=')])
            .reduce((acc, [k, v]) => {
                acc[k.trim()] = decodeURIComponent(v);
                return acc;
            }, {});
    }

}


module.exports = Util;