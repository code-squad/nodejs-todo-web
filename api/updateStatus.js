const db = require('./DataHandler');
const parseCookies = require('./cookie-session');

const updateItemStatus = () => async (req, res, next) => {

    const cookies = parseCookies(req.headers.cookie);
    if (cookies) {
        const {item_id, updated_status, targetItemId} = req.body;
        const user_name = db.get('session').find({'sessionId': parseInt(cookies.session)}).value().name;
        const user_idx = getIdxOfUser(user_name);
        console.log(updated_status);
        const updatedStatusItem = await updateDB(user_idx, item_id, updated_status);
        console.log(updatedStatusItem);
        const reordered_todoList = await updateItemOrderInList(user_idx, item_id, targetItemId);
        db.get(`users[${user_idx}].todos`).assign(reordered_todoList).write();

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(JSON.stringify(reordered_todoList));
    }

};

const updateDB = (user_idx, item_id, updated_status) => {
    return new Promise((resolve) => {
        db.get(`users[${user_idx}].todos`).find({id: parseInt(item_id)}).assign({status: updated_status}).write();
        const updatedStatusItem = db.get(`users[${user_idx}].todos`).find({id: parseInt(item_id)}).value();
        resolve(updatedStatusItem)
    });

};

const updateItemOrderInList = (user_idx, item_id, targetItemId) => {
    return new Promise((resolve) => {
        const todos = db.get(`users[${user_idx}].todos`).value();
        const current_item = db.get(`users[${user_idx}].todos`).find({'id': parseInt(item_id)}).value();
        const target_item = db.get(`users[${user_idx}].todos`).find({'id': parseInt(targetItemId)}).value();
        const current_item_index = todos.indexOf(current_item);
        const target_item_index = todos.indexOf(target_item);

        todos.splice(current_item_index,1);
        todos.splice(target_item_index+1,0,current_item);
        resolve(todos)
    })
};


const getIdxOfUser = (login_user_id) => {
    const ID_fromDB = db.get('users').find({'id': login_user_id}).value();
    return db.get('users').value().indexOf(ID_fromDB)
};


module.exports = {
    updateItemStatus
};