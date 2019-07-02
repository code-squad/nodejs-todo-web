const model = require('./model');

const updateController = {
    async update({ user, targetID, siblingID, status }) {
        const items = JSON.parse(await model.readStaticFile('./items.json'));
        const targetItemIndex = items[user].findIndex((element) => {
            return element.id === parseInt(targetID);
        });
        targetItem = items[user][targetItemIndex];
        targetItem.status = status;
        items[user].splice(targetItemIndex, 1);
        if(siblingID === null) {
            items[user].push(targetItem);
            return await model.writeStaticFile('./items.json', items);
        }
        const siblingItemIndex = items[user].findIndex((element) => {
            return element.id === parseInt(siblingID);
        });
        items[user].splice(siblingItemIndex, 0, targetItem);
        return await model.writeStaticFile('./items.json', items);
    }
}

module.exports = updateController;