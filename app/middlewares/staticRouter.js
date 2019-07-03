const fs = require('fs');
const { getMimeType, getFileExtentsion, makeFilePath } = require('../../util');

module.exports = async (req, res, next) => {
  try {
    if(req.url.startsWith('/public')){
      res.setHeader('Content-Type', getMimeType(getFileExtentsion(req.url)));
      const content = await fs.promises.readFile(makeFilePath(req.url));
      res.end(content);
    } else {
      next();
    }
  } catch (error) {
    if(error.errno === -2) {
      next();
    } else {
      next(error);
    }
  }
};
