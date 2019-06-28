const should = require('should');
const serveStatic = require('../../middlewares/serve-static');

// describe('serveStatic Module', () => {
//   it('요청 url 파일 확장자 가져오기', () => {
//     const req = {};
//     req["url"] = '/sample/power/tuna.img';
//     const expected = '.img';
//     const result = serveStatic.getExt(req);
    
//     should(result).be.equal(expected);
//   })
// })