const model = require('./model');

const signupController = {
    async signup(id, password) {
        const members = JSON.parse(await model.readStaticFile('./members.json'));
        if(members.find((element) => element.id === id)) return false;
        const member = {"id":id, "password":password};
        const items = JSON.parse(await model.readStaticFile('./items.json'));
        members.push(member);
        items[id] = [];
        return (await model.writeStaticFile('./members.json', members) && await model.writeStaticFile('./items.json', items));
    }
}

module.exports = signupController;