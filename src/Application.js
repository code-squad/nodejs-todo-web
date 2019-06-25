const http = require('http');
const Middleware = require('./Middleware');

const Application = () => {
    const middleware = Middleware();

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

    const get = (path, fn) => {
        if (!path || !fn) throw Error('path and fn is required');
        fn._method = 'get';
        use(path,fn);
    };

    const post = (path, fn) => {
        if (!path || !fn) throw Error('path and fn is required');
        fn._method = 'post';
        use(path,fn);
    };

    const listen = (port=3000, hostname='127.0.0.1', fn) => {
        server.listen(port,hostname,fn)
    };

    return {
        middleware,
        use,
        get,
        post,
        listen
    }
};

module.exports =Application;