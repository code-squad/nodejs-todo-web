const db = require('./DataHandler');
const parseCookies = require('./cookie-session');

const updateTodoList = () => (req, res, next) => {

    const cookies = parseCookies(req.headers.cookie);
    if (cookies) {
        const {item_id, updated_title} = req.body;
        const user_name = db.get('session').find({'sessionId': parseInt(cookies.session)}).value().name;
        const user_idx = getIdxOfUser(user_name);

        db.get(`users[${user_idx}].todos`).find({id: parseInt(item_id)}).assign({title: updated_title}).write();
        const updatedItem = db.get(`users[${user_idx}].todos`).find({id: parseInt(item_id)}).value();

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(JSON.stringify(updatedItem));
    }

};

const getIdxOfUser = (login_user_id) => {
    const ID_fromDB = db.get('users').find({'id': login_user_id}).value();
    return db.get('users').value().indexOf(ID_fromDB)
};


module.exports = {
    updateTodoList
};