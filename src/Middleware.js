class Middleware {
    constructor() {
        this.middlewares = [];
        this.req;
        this.res;
    }

    add(fn) {
        this.middlewares.push(fn);
    }

    _run(i, err) {
        if (i < 0 || i >= this.middlewares.length) return;

        const selectedFunc = this.middlewares[i];
        const next = (err) => this._run(i + 1, err);

        if (err) {
            return selectedFunc.length === 4 ?
                selectedFunc(err, this.req, this.res, next) :
                this._run(i + 1, err);
        }

        if (selectedFunc._path) {
            return this.req.url === selectedFunc._path ?
                selectedFunc(this.req, this.res, next) :
                this._run(i + 1);
        }

        selectedFunc(this.req, this.res, next);
    }

    run(req, res) {
        this.req = req;
        this.res = res;

        this._run(0, null);
    }

}

module.exports = Middleware;
