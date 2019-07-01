const todos = require('./filedb/todos.json');

class Model {
    constructor() {
        this.todos = this.loadData();
        this.idList = this.getAllId();
    }

    loadData() {
        const strObject = JSON.stringify(todos);
        const obj = JSON.parse(strObject);
        return obj;
    }

    getAllId() {
        const columns = this.todos;
        console.log(columns);
        for (let property in columns) {
            console.log(property);
        }
    }

    appendCard(card) {
        
    }

    createRandomNumber() {

    }

    updateData() {

    }
}

module.exports = Model;
const model = new Model();
