const todoListManager = require('./todoList_manager');
const fileManager = require('./file_manager');
const httpStatus = require('./http_status');
const utility = require('./utility');
const http = require('http');

const sessionTable = new Map();

const receiveData = (request) => {
    return new Promise((resolve) => {
        let body = '';
        request.on('data', (chunk) => body += chunk).on('end', () => resolve(JSON.parse(body)));
    });
}

const checkSessionID = async (cookie) => {
    return cookie !== undefined && sessionTable.has(utility.parse(cookie).SID);
}

const login = async (input) => {
    const member = JSON.parse(await fileManager.readMemberInfo());
    return (member[input.id] === input.pw) ? true : false;
}

const isNotExistMember = async (input) => {
    const member = JSON.parse(await fileManager.readMemberInfo());
    return (member[input.id] === undefined) ? true : false;
}

const createSessionID = async (inputID) => {
    let sessionID = 0;
    while (true) {
        const min = 100000000000000000, max = 999999999999999999;
        sessionID = String(Math.floor(Math.random() * (max - min + 1)) + min);
        if (!sessionTable.has(sessionID)) {
            const jsonData = JSON.parse(await todoListManager.readTodoList());
            sessionTable.set(sessionID, { id : inputID, contents : jsonData[inputID] });
            console.log(`[ Server ] session Table size : ${sessionTable.size}`);
            break;
        }
    }
    return sessionID;
}

const signIn = async (request, response) => {
    console.time(`[ Server ] Sign In process `);
    const input = await receiveData(request);
    if (await login(input)) {
        const cookieInfo = [`SID=${await createSessionID(input.id)}; Max-Age=${60 * 60 * 24 * 30}`];
        response.statusCode = httpStatus.MOVED_PERMANENTLY;
        response.setHeader('Set-Cookie', cookieInfo);
    } else response.statusCode = httpStatus.OK;
    response.end();
    console.timeEnd(`[ Server ] Sign In process `);
}

const signUp = async (request, response) => {
    console.time(`[ Server ] Sign Up process `);
    const input = await receiveData(request);
    if (await isNotExistMember(input)) {
        fileManager.writeMemberInfo(input);
        todoListManager.initTodoList(input.id);
        response.statusCode = httpStatus.MOVED_PERMANENTLY;
    } else response.statusCode = httpStatus.OK;
    response.end();
    console.timeEnd(`[ Server ] Sign Up process `);
}

const signOut = async (request, response) => {
    console.time(`[ Server ] Sign Out process `);
    if (request.headers.cookie !== undefined) {
        const sessionID = utility.parse(request.headers.cookie).SID;
        if (sessionTable.has(sessionID)) sessionTable.delete(sessionID);
    }
    response.statusCode = httpStatus.MOVED_PERMANENTLY;
    response.setHeader('Location', `http://${request.headers.host}/`);
    response.end();
    console.timeEnd(`[ Server ] Sign Out process `);
}

const error = async (response) => {
    response.statusCode = httpStatus.NOT_FOUND;
    response.end();
}

const redirect = async (response, request, URL) => {
    response.statusCode = httpStatus.MOVED_PERMANENTLY;
    response.setHeader('Location', `http://${request.headers.host}${URL}`);
    response.end();
}

////////////////////////////////////////////////////////////////////////////
// command ..
const addItem = async (request, response) => {
    const data = await receiveData(request);
    const sessionID = utility.parse(request.headers.cookie).SID;
    if (sessionTable.has(sessionID)) {
        const todoList = sessionTable.get(sessionID).contents;
        todoList[data.type].splice(data.index, 0, data.value);
        response.end();
    } else throw Error(`[Server - Error] Session ID is not saved after Login. ( Add Item )`);
}

const deleteItem = async (request, response) => {
    const data = await receiveData(request);
    const sessionID = utility.parse(request.headers.cookie).SID;
    if (sessionTable.has(sessionID)) {
        const todoList = sessionTable.get(sessionID).contents;
        todoList[data.type].splice(data.index, 1);
        response.end();
    } else throw Error(`[Server - Error] Session ID is not saved after Login. ( Delete Item )`);
}

const showItem = async (request, response) => {
    const sessionID = utility.parse(request.headers.cookie).SID;
    if (sessionTable.has(sessionID)) {
        const todoList = sessionTable.get(sessionID).contents;
        response.write(JSON.stringify(todoList));
        response.end();
    } else throw Error(`[Server - Error] Session ID is not saved after Login. ( Show Item )`);
}
////////////////////////////////////////////////////////////////////////////

const post = async (request, response) => {
    switch (request.url) {
        case '/add'         : addItem(request, response);    break;
        case '/delete'      : deleteItem(request, response); break;
        case '/signInCheck' : signIn(request, response);     break;
        case '/signUpCheck' : signUp(request, response);     break;
        case '/signOut'     : signOut(request, response);    break;
        default             : error(response);               break;
    }
}

const get = async (request, response) => {
    if (await checkSessionID(request.headers.cookie)) {
        switch (request.url) { 
            case '/'        : 
            case '/signIn?' : 
            case '/signUp?' : redirect(response, request, '/todoList'); break;
            case '/show'    : showItem(request, response);              break;
            default         : fileManager.loadStaticFile(request.url, response);
        }
    } else {
        switch (request.url) {
            case '/todoList': redirect(response, request, '/signIn?'); break;
            default         : fileManager.loadStaticFile(request.url, response);
        }
    }
}

const serverEventEmitter = http.createServer((request, response) => {
    switch (request.method) {
        case 'POST' : post(request, response);  break;
        case 'GET'  : get(request, response);   break;
        default     : error(response);
    }
});

module.exports = serverEventEmitter;
