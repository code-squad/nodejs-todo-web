class Middleware {
    constructor() {
        this.middlewares = [];
        this.req;
        this.res;
    }

    add(fn) {
        this.middlewares.push(fn);
    }

    _run(i) {
        if (i < 0 || i >= this.middlewares.length) return;

        const selectedFunc = this.middlewares[i];
        const next = () => this._run(i + 1);

        selectedFunc(this.req, this.res, next);
    }

    run(req, res) {
        this.req = req;
        this.res = res;

        this._run(0);
    }

}

module.exports = Middleware;
