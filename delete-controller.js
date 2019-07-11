const model = require('./model');

const deleteController = {
    async delete(user, id) {
        const items = JSON.parse(await model.readStaticFile('./items.json'));
        const indexOfItemToDelete = items[user].indexOf(items[user].find((element) => {
            return element.id === parseInt(id);
        }));
        items[user].splice(indexOfItemToDelete, 1);
        return await model.writeStaticFile('./items.json', items);
    }
}

module.exports = deleteController;