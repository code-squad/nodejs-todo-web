const db = require('./DataHandler');
const parseCookies = require('./cookie-session');


const delete_session = () => (req, res, next) => {
    const cookies = parseCookies(req.headers.cookie);

    if (cookies.session) {
        console.log(cookies.session);
        const sessionId = db.get('session').find({'sessionId': parseInt(cookies.session)}).value().sessionId;
        console.log(sessionId);

        db.get('session').remove({sessionId: sessionId}).write();

        res.writeHead(302, {
            Location    : '/',
            'Set-Cookie': `session=; Expires=; HttpOnly; Path=/`,
        });
        res.end()

    }
};

module.exports = {
    delete_session
};