

const Middleware = () => {
    const middleware = [];
    let _req, _res;

    const add = fn => {
        middleware.push(fn);
    };

    const run = (req,res) => {
        _req = req;
        _res = res;

        _run(0, null);
    };

    const _run = (i, err) => {
        if(i<0 || i >= middleware.length) return;

        const nextMw = middleware[i];
        const next = (err) => _run(i+1, err);

        if(err){
            const isNextErrorMw = nextMw.length ===4;
            return isNextErrorMw ? nextMw(err, _req, _res, next) : _run(i+1,err);
        }

        if (nextMw._path){
            const pathMatched = _req.url === nextMw._path && _req.method.toLowerCase() === (nextMw._method || 'get');
            return pathMatched ? nextMw(_req, _res, next) : _run(i+1);
        }

        nextMw(_req, _res, next);
    };



    return {
        middleware,
        add,
        run,
    }
};

module.exports = Middleware;