const fs = require('fs');
const mimeTypeList = require('./mime-type.js');

const readFile = (filePath, ext) => {
	return new Promise((resolve, reject) => {
		const mimeType = getMimeType(ext);

		fs.readFile(filePath, (error, file) => {
			if (error) {
				reject(error);
			} else {
				resolve({ file, mimeType });
			}
		});
	});
};

const getMimeType = ext => {
	if (Object.keys(mimeTypeList).includes(ext)) {
		return mimeTypeList[ext];
	}
};

module.exports = {
	readFile
};
