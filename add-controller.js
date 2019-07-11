const model = require('./model');
const { generateRandomInt } = require('./util');

const addController = {
    async add(user, item) {
        item.id = generateRandomInt();
        const items = JSON.parse(await model.readStaticFile('./items.json'));
        items[user].push(item);
        if(await model.writeStaticFile('./items.json', items)) {
            return item.id;
        }
        return false;
    }
}

module.exports = addController;