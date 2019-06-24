const path = require('path');
var crypto = require('crypto');

exports.parseCookie = function(rawCookie){
  try {
    const cookies = rawCookie.split(';')
                    .reduce((acc, cookieStr) => {
                      const splitKeyValue = cookieStr.trim().split('=');
                      acc[splitKeyValue[0]] = splitKeyValue[1];
                      return acc;
                    }, {});
    return cookies;
  } catch (error) {
    // console.error(error);
    return undefined;
  }
};

exports.generateSessionId = function() {
    var sha = crypto.createHash('sha256');
    sha.update(Math.random().toString());
    return sha.digest('hex');
};

exports.getFileExtentsion = function(rawResourcePath) {
  let idx = rawResourcePath.length - 1;
  for(let i = idx - 1; i >= 0 ; --i ){
    if(rawResourcePath[i] === '.') {
      idx = i + 1;
      break;
    }
  }

  return rawResourcePath.slice(idx, rawResourcePath.length);
};

exports.makeFilePath = function(resourcePath) {
  return path.join(process.cwd(), resourcePath);
}

const mimeTypeMap = {
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  json: 'application/json',
  png: 'image/png',
  jpeg: 'image/jpeg', 
  jpg: 'image/jpeg', 
  git: 'image/gif',
};

exports.getMimeType = function(fileExtension){
  return mimeTypeMap.hasOwnProperty(fileExtension) ? mimeTypeMap[fileExtension] : 'text/plain';
}
