const db = require('./DataHandler');
const parseCookies = require('./cookie-session');

const addTodoList = () => async (req, res, next) => {
    const cookies = parseCookies(req.headers.cookie);
    if (cookies) {
        const {title, status} = req.body;
        const user_name = db.get('session').find({'sessionId': parseInt(cookies.session)}).value().name;
        const user_idx = getIdxOfUser(user_name);
        const newTask = await addItemToDB(user_idx, title, status);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(JSON.stringify(newTask));
    }

};


const addItemToDB = (user_idx, title, status) => {
    return new Promise((async resolve => {
        const newID = Math.floor(Math.random() * 10000) + 1;
        const newTask = {
            id    : newID,
            title : title,
            status: status,
        };
        await db.get(`users[${user_idx}].todos`).push(newTask).write();
        resolve(newTask);
    }))

};

const getIdxOfUser = (login_user_id) => {
    const ID_fromDB = db.get('users').find({'id': login_user_id}).value();
    return db.get('users').value().indexOf(ID_fromDB)
};


module.exports = {
    addTodoList,
    addItemToDB,
    getIdxOfUser
};