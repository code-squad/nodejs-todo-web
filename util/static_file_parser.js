module.exports.getExtension = (url) => {
    const commaIndex = url.lastIndexOf('.');
    return url.substr(commaIndex, url.length - commaIndex);
}