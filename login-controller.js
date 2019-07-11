const model = require('./model');

const loginController = {
    async login(id, password) {
        const members = JSON.parse(await model.readStaticFile('./members.json'));
        const member = members.find((element) => element.id === id);
        if(member === undefined) return false;
        if(member.password === password) return true;
        return false;
    }
}

module.exports = loginController;