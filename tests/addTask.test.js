const addTask = require('../api/addTask');

describe('addTask', () => {

    it('should return new task object which I added', async () => {
        const user_id = 'test';
        const user_index = addTask.getIdxOfUser(user_id);
        const title = 'test';
        const status = 'todo';
        const result = await addTask.addItemToDB(user_index, title, status);
        expect(result).toHaveProperty('title', title);
        expect(result).toHaveProperty('status', status);
    });

});