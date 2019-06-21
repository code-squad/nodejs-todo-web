const fs = require('fs');

const readFile = filePath => {
	fs.readFile(filePath, (error, file) => {
		if (error) {
			console.log(error);
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.write('404 file not found!');
		} else {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write(file);
		}
		res.end();
	});
};
