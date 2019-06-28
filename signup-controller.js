const model = require('./model');

const signupController = {
    async signup(id, password) {
        const member = {"id":id, "password":password};
        const members = JSON.parse(await model.readStaticFile('./members.json'));
        members.push(member);
        return await model.writeStaticFile('./members.json', members);
    }
}

module.exports = signupController;