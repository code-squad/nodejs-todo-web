module.exports.getExtension = (url) => {
    const commaIndex = url.lastIndexOf('.');
    return url.substr(commaIndex, url.length - commaIndex);
}

module.exports.convert = (url) => {
    const convertURL = {
        '/'             : '/index.html',
        '/signIn?'      : '/signIn.html',
        '/signUp?'      : '/signUp.html',
        '/todoList'     : '/todoList.html',
    }
    return (convertURL[url] === undefined) ? url : convertURL[url];
}

module.exports.parse = (cookie) => {
    return cookie.replace(/(\s*)/g, "")
                .split(';')
                .map(value => value.split('='))
                .reduce((preValue, [key, value]) => {
                    preValue[key] = value;
                    return preValue;
                }, {});
}