const util = {
    parseCookie(cookie) {
        return cookie.split(';').map((element) => element.split('=')).reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
    }
}

module.exports = util;