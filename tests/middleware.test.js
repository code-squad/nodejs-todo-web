const Middleware = require('../src/Middleware');

describe('Middleware', () => {
    let middleware;
    middleware = Middleware();

    it('should return 0 if it is initial middleware', () => {
        const result = middleware.middleware.length;
        expect(result).toBe(0);
    });
});

describe('Add Middleware', () => {
    let middleware;
    middleware = Middleware();

    it('Add middlewares in array', () => {
        const fns = [
            ()=>{},
            ()=>{},
            ()=>{},
        ];
        fns.forEach(fn => middleware.add(fn));
        const result = middleware.middleware.length;
        expect(result).toBe(fns.length);
    });
});
