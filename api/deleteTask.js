const db = require('./DataHandler');
const parseCookies = require('./cookie-session');

const deleteTodoList = () => async (req, res, next) => {

    const cookies = parseCookies(req.headers.cookie);
    if (cookies) {
        const {item_id} = req.body;
        const user_name = db.get('session').find({'sessionId': parseInt(cookies.session)}).value().name;
        const user_idx = getIdxOfUser(user_name);
        const deletedItem = await deleteItemFromDB(user_idx, item_id);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(JSON.stringify(deletedItem));
    }

};

const deleteItemFromDB = (user_idx, item_id) =>{
    return new Promise((resolve => {
    const deletedItem = db.get(`users[${user_idx}].todos`).remove({id: parseInt(item_id)}).write();
    resolve(deletedItem[0]);
    }))
};

const getIdxOfUser = (login_user_id) => {
    const ID_fromDB = db.get('users').find({'id': login_user_id}).value();
    return db.get('users').value().indexOf(ID_fromDB)
};


module.exports = {
    deleteTodoList,
    getIdxOfUser
};