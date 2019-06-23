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
