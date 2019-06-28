const model = require('./model');

const signupController = {
    async signup(id, password) {
        const members = JSON.parse(await model.readStaticFile('./members.json'));
        if(members.find((element) => element.id === id)) return false;
        const member = {"id":id, "password":password};
        members.push(member);
        return await model.writeStaticFile('./members.json', members);
    }
}

module.exports = signupController;