module.exports.getExtension = (url) => {
    const commaIndex = url.lastIndexOf('.');
    return url.substr(commaIndex, url.length - commaIndex);
}

module.exports.getCookieObject = (cookie) => {
    return cookie.replace(/(\s*)/g, "")
                .split(';')
                .map(value => value.split('='))
                .reduce((preValue, [key, value]) => {
                    preValue[key] = value;
                    return preValue;
                }, {});
}