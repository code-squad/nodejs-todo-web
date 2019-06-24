const http = require('http');
const Middleware = require('./Middleware');

const Application = () => {
    const middleware = new Middleware();

    const server = http.createServer((req,res) => {
        middleware.run(req,res)
    });


    const use = (path, fn) => {
        if(typeof path === 'string' && typeof fn === 'function'){
            fn._path = path;
        } else if(typeof path === 'function'){
            fn = path;
        } else {
            throw Error('Usage: use(path, fn) or use(fn)');
        }

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