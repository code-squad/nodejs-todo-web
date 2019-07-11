
class Middleware {
  constructor() {
    this.fns = [];
    this.run = (idx, err) => {
      if (idx < 0 || idx >= this.fns.length) return;
      
      const nextMw = this.fns[idx];
      const next = (err) => this.run(idx + 1, err);
      
      if (err) {
        const nextMwIsErrorMw = nextMw.length === 4;
        return nextMwIsErrorMw ? nextMw(err, req, res, next) : 
          this.run(idx + 1, err);
      }
      nextMw(this.req, this.res, next);
    }
    this.req = null;
    this.res = null;
  }
  add(fn) {
    this.fns.push(fn);
  }
  runthis(req, res) {
    this.req = req;
    this.res = res;
    this.run(0);
  }
}

module.exports = Middleware;