const mimeTypeList = require('../data/mime-type.js');

const getMimeType = ext => {
	if (Object.keys(mimeTypeList).includes(ext)) {
		return mimeTypeList[ext];
	}
};
