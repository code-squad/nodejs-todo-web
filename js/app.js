const http = require('http');
const myApp = require('./server.js');

const port = 8000;

try {
	const server = http.createServer((req, res) => {
		const method = req.method;
		const url = req.url;

		if (method === 'GET') {
			myApp.get(url, req, res);
		}
		if (method === 'POST') {
			myApp.post(url, req, res);
		}
		if (method === 'PUT') {
			myApp.put(url, req, res);
		}
		if (method === 'DELETE') {
			myApp.del(url, req, res);
		}
	});

	server.listen(port, () => {
		console.log(`start server ${port} port....!!`);
	});
} catch (error) {
	console.log('error .....', error);
	myApp.use('/error-404', req, res);
}
