const db = require('./DataHandler');
const parseCookies = require('./cookie-session');

const list_items = () => async (req, res, next) => {
    const cookies = parseCookies(req.headers.cookie);
    if (cookies) {
        const {status} = req.body;
        const user_name = db.get('session').find({'sessionId': parseInt(cookies.session)}).value().name;
        const user_idx = getIdxOfUser(user_name);
        const items_sortedByStatus = await getTodoStatusItemFromDB(user_idx, status);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(items_sortedByStatus));
    }

};

const getTodoStatusItemFromDB = (user_idx) => {
    return new Promise((resolve) => {
        const user_items = db.get(`users[${user_idx}].todos`).value();
        const todoStatusItem = user_items.filter(v => {
            return v.status === 'todo';
        });
        const doingStatusItem = user_items.filter(v => {
            return v.status === 'doing';
        });
        const doneStatusItem = user_items.filter(v => {
            return v.status === 'done';
        });
        resolve({todoStatusItem, doingStatusItem, doneStatusItem})
    });

};

const getIdxOfUser = (login_user_id) => {
    const ID_fromDB = db.get('users').find({'id': login_user_id}).value();
    return db.get('users').value().indexOf(ID_fromDB)
};


module.exports = {
    list_items
};