const http = require('http');
const myApp = require('./server.js');

const PORT = process.env.PORT;

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

server.listen(PORT, () => {
	console.log(`start server ${PORT} port....!!`);
});
