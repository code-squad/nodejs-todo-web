const db = require('./DataHandler');

// json 파일 db 데이터 초기화
if (!db.get('users')) {
    db.defaults({users: [], session: [], test: []}).write();
}

const valid_info = () => (req, res, next) => {
    const {name, password} = req.body;
    // check valid info
    const isDuplicated = !!checkDuplicatedID(name);

    if (!isDuplicated) {
        db.get('users').push({id: name, pw: password, todos: []}).write();
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end()
    } else {
        res.statusCode = 302;
        res.setHeader('Location', '/register');
        res.setHeader('Content-Type', 'text/plain');
        res.end('fail');
        console.error('이미 존재하는 아이디 입니다')
    }

};

const checkDuplicatedID = (id) => {
    const user_info = db.get('users').find({'id': id}).value();
    console.log('user_info', user_info);
    return user_info !== undefined;
};

module.exports = {
    valid_info,
    checkDuplicatedID,
};
