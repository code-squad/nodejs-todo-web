const db = require('./DataHandler');
const parseCookies = require('./cookie-session');

const list_done_item = () => async (req, res, next) => {

    const cookies = parseCookies(req.headers.cookie);
    if (cookies) {
        const {status} = req.body;
        const user_name = db.get('session').find({'sessionId': parseInt(cookies.session)}).value().name;
        const user_idx = getIdxOfUser(user_name);
        const todoStatusItem = await getDoneStatusItemFromDB(user_idx, status);
        console.log(todoStatusItem);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(JSON.stringify(todoStatusItem));
    }

};

const getDoneStatusItemFromDB = (user_idx, done_status) => {
    return new Promise((resolve) => {
        const user_todo_items = db.get(`users[${user_idx}].todos`).value();
        const doneStatusItem= user_todo_items.filter(v=>{
            return v.status === done_status;
        });
        resolve(doneStatusItem)
    });

};

const getIdxOfUser = (login_user_id) => {
    const ID_fromDB = db.get('users').find({'id': login_user_id}).value();
    return db.get('users').value().indexOf(ID_fromDB)
};


module.exports = {
    list_done_item
};