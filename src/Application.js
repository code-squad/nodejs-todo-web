const http = require('http');
const Middleware = require('./Middleware');

const Application = () => {
    const middleware = new Middleware();

    const server = http.createServer((req,res) => {
        middleware.run(req,res)
    });


    const use = (fn) => {
        middleware.add(fn)
    };

    const listen = (port=3000, hostname='127.0.0.1', fn) => {

    };

    return {
        server,
        use,
        listen
    }
};

module.exports =Application;