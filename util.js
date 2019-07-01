const util = {
    parseCookie(cookie) {
        return cookie.split(';').map((element) => element.split('=')).reduce((acc, [key, value]) => {
            acc[key.trim()] = value;
            return acc;
        }, {});
    },

    getRandomInt() {
        return +new Date();
    }
}

module.exports = util;