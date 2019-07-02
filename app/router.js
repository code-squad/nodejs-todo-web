const Middleware = require('./middleware');

class ErrorCatcher {
  constructor(){
    this.thrownError = undefined;
  }

  setError(err) {
    this.thrownError = err;
  }
}

class Router {
  constructor() {
    this.basePath = '/';
    this.routes = {
      "GET": {},
      "POST": {},
      "PUT": {},
      "DELETE": {},
    };
  }

  add(method, path, middlewares = []){
    const routerMiddleware = new Middleware();
    middlewares.forEach(middleware => routerMiddleware.add(middleware));
    this.routes[method][path] = routerMiddleware;
  }

  get(path, ...middlewares) {
    this.add("GET", path, middlewares);
  }

  post(path, ...middlewares) {
    this.add("POST", path, middlewares);
  }

  put(path, ...middlewares) {
    this.add("PUT", path, middlewares);
  }

  delete(path, ...middlewares) {
    this.add("DELETE", path, middlewares);
  }

  find(method, url){
    const routeUrl = url.replace(this.basePath, '') || '/';
    return this.routes[method][routeUrl];
  }

  run(req, res, next) {
    const route = this.find(req.method, req.url);
    const errorCatcher = new ErrorCatcher();
    if(req.url.split('/')[1] === this.basePath.split('/')[1] && route){
      const routerMiddlewares = route;

      routerMiddlewares.add(errorCatcher.setError.bind(errorCatcher));
      routerMiddlewares.run(req, res);
      if(errorCatcher.thrownError){
        next(errorCatcher.thrownError);
      }
    } else {
      next();
    }
  }
};

module.exports = Router;