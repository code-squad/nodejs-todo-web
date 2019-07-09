module.exports.parse = (cookie) => {
    return cookie.replace(/(\s*)/g, "")
                .split(';')
                .map(value => value.split('='))
                .reduce((preValue, [key, value]) => {
                    preValue[key] = value;
                    return preValue;
                }, {});
}