const getExtension = (url) => {
    const commaIndex = url.lastIndexOf('.');
    return url.substr(commaIndex, url.length - commaIndex);
}

module.exports.parse = (url) => {
    return getExtension(url);
}
