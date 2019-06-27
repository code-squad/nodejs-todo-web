const db = require('./DataHandler');
const parseCookies = require('./cookie-session');

const addTodoList = () => (req, res, next) => {

    const cookies = parseCookies(req.headers.cookie);
    if (cookies) {
        const {title, status} = req.body;
        const user_name = db.get('session').find({'sessionId': parseInt(cookies.session)}).value().name;
        const user_obj = db.get('users').find({'id': user_name}).value();
        console.log(user_obj);
        const user_idx = getIdxOfUser(user_name);
        console.log(req.body);
        const newID = Math.floor(Math.random() * 10000) + 1;
        const newTask = {
            id : newID,
            title : title,
            status: status,
        };
        db.get(`users[${user_idx}].todos`).push(newTask).write();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(JSON.stringify(newTask));
    }

};

const getIdxOfUser = (login_user_id) => {
    const ID_fromDB = db.get('users').find({'id': login_user_id}).value();
    return db.get('users').value().indexOf(ID_fromDB)
};


module.exports = {
    addTodoList
};