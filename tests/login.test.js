const login = require('../api/login');

describe('login', ()=>{
    it('should return true if it is vaild user', ()=>{
        const id = 'test';
        const pw = 123;
        const result = login.checkID_PW(id,pw);
        expect(result).toBe(true);
    });
});
