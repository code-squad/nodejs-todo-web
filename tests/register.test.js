const register = require('../api/register');
const db = require('../api/DataHandler');

describe('register', ()=>{
    it('should return id which the user registered', ()=>{
        const id = 'test';
        const pw = 123;
        db.get('test').push({id: id, pw: pw, todos: []}).write();
        const result = db.get('test').find({'id': id}).value();
        expect(result.id).toMatch(id);
    });

    it('should return true if it has duplicated id in DB', ()=>{
        const result = register.checkDuplicatedID('test');
        expect(result).toBe(true);
    });
});
