const db = require('./DataHandler');
const parseCookies = require('./cookie-session');

const updateItemStatus = () => async (req, res, next) => {

    const cookies = parseCookies(req.headers.cookie);
    if (cookies) {
        const {item_id, updated_status} = req.body;
        const user_name = db.get('session').find({'sessionId': parseInt(cookies.session)}).value().name;
        const user_idx = getIdxOfUser(user_name);
        const updatedStatusItem = await updateDB(user_idx, item_id, updated_status);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(JSON.stringify(updatedStatusItem));
    }

};

const updateDB = (user_idx, item_id, updated_status) => {
    return new Promise((resolve) => {
        db.get(`users[${user_idx}].todos`).find({id: parseInt(item_id)}).assign({status: updated_status}).write();
        const updatedStatusItem = db.get(`users[${user_idx}].todos`).find({id: parseInt(item_id)}).value();
        resolve(updatedStatusItem)
    });

};

const getIdxOfUser = (login_user_id) => {
    const ID_fromDB = db.get('users').find({'id': login_user_id}).value();
    return db.get('users').value().indexOf(ID_fromDB)
};


module.exports = {
    updateItemStatus
};