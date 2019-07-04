const todoListManager   = require('./manager/todoList_manager');
const memberManager     = require('./manager/member_manager');
const utilCookies       = require('./util/cookie_parser');
const staticFile        = require('./static_file');
const httpStatus        = require('./http_status');
const http              = require('http');

const sessionTable = new Map();

const receiveData = (request) => {
    return new Promise((resolve) => {
        let body = '';
        request.on('data', (chunk) => body += chunk).on('end', () => resolve(JSON.parse(body)));
    });
}

const isExistSessionID = async (cookie) => {
    return cookie !== undefined && sessionTable.has(utilCookies.parse(cookie).SID);
}

const isExistPassword = async (input) => {
    const member = JSON.parse(await memberManager.readMemberInfo());
    return (member[input.id] === input.pw) ? true : false;
}

const isNotExistMember = async (input) => {
    const member = JSON.parse(await memberManager.readMemberInfo());
    return (member[input.id] === undefined) ? true : false;
}

// TODO : crypto 모듈 사용해서 세션 ID를 만들도록 변경할 것..
const createSessionID = async (inputID) => {
    let sessionID = 0;
    while (true) {
        const min = 100000000000000000, max = 999999999999999999;
        sessionID = String(Math.floor(Math.random() * (max - min + 1)) + min);
        if (!sessionTable.has(sessionID)) {
            sessionTable.set(sessionID, inputID);
            console.log(`[ Server ] session Table size : ${sessionTable.size}`);
            break;
        }
    }
    return sessionID;
}

const signIn = async (request, response) => {
    console.time(`[ Server ] Sign In process `);
    const input = await receiveData(request);
    if (await isExistPassword(input)) {
        const cookieInfo = [`SID=${await createSessionID(input.id)}; Max-Age=${60 * 60 * 24 * 30}`];
        response.statusCode = httpStatus.FOUND;
        response.setHeader('Set-Cookie', cookieInfo);
    } else response.statusCode = httpStatus.FORBIDDEN;
    response.end();
    console.timeEnd(`[ Server ] Sign In process `);
}

const signUp = async (request, response) => {
    console.time(`[ Server ] Sign Up process `);
    const input = await receiveData(request);
    if (await isNotExistMember(input)) {
        memberManager.writeMemberInfo(input);
        todoListManager.initTodoList(input.id);
        response.statusCode = httpStatus.FOUND;
    } else response.statusCode = httpStatus.FORBIDDEN;
    response.end();
    console.timeEnd(`[ Server ] Sign Up process `);
}

const signOut = async (request, response) => {
    console.time(`[ Server ] Sign Out process `);
    if (request.headers.cookie !== undefined) {
        const sessionID = utilCookies.parse(request.headers.cookie).SID;
        if (sessionTable.has(sessionID)) sessionTable.delete(sessionID);
    }
    redirect(response, '/');
    console.timeEnd(`[ Server ] Sign Out process `);
}

const error = async (response) => {
    response.statusCode = httpStatus.NOT_FOUND;
    response.end();
}

const redirect = async (response, URL) => {
    response.statusCode = httpStatus.FOUND;
    response.setHeader('Location', `${URL}`);
    response.end();
}

////////////////////////////////////////////////////////////////////////////
// command ..
const addItem = async (request, response) => {
    const data = await receiveData(request);
    const sessionID = utilCookies.parse(request.headers.cookie).SID;
    if (sessionTable.has(sessionID)) {
        const jsonData = JSON.parse(await todoListManager.readTodoList());
        const todoList = jsonData[sessionTable.get(sessionID)];
        todoList[data.type].splice(data.index, 0, data.value);
        todoListManager.writeTodoList(JSON.stringify(jsonData));
        response.end();
    } else throw Error(`[Server - Error] Session ID is not saved after Login. ( Add Item )`);
}

const deleteItem = async (request, response) => {
    const data = await receiveData(request);
    const sessionID = utilCookies.parse(request.headers.cookie).SID;
    if (sessionTable.has(sessionID)) {
        const jsonData = JSON.parse(await todoListManager.readTodoList());
        const todoList = jsonData[sessionTable.get(sessionID)];
        todoList[data.type].splice(data.index, 1);
        todoListManager.writeTodoList(JSON.stringify(jsonData));
        response.end();
    } else throw Error(`[Server - Error] Session ID is not saved after Login. ( Delete Item )`);
}

const updateItem = async (request, response) => {
    const data = await receiveData(request);
    const sessionID = utilCookies.parse(request.headers.cookie).SID;
    if (sessionTable.has(sessionID)) {
        const jsonData = JSON.parse(await todoListManager.readTodoList());
        const todoList = jsonData[sessionTable.get(sessionID)];
        const [ addValue ] = todoList[data.deleteType].splice(data.deleteIndex, 1);
        if (data.deleteType === data.addType && data.deleteIndex < data.addIndex) data.addIndex--;
        todoList[data.addType].splice(data.addIndex, 0, addValue);
        todoListManager.writeTodoList(JSON.stringify(jsonData));
        response.end();
    } else throw Error(`[Server - Error] Session ID is not saved after Login. ( Delete Item )`);
}

const showItem = async (request, response) => {
    const sessionID = utilCookies.parse(request.headers.cookie).SID;
    if (sessionTable.has(sessionID)) {
        const jsonData = JSON.parse(await todoListManager.readTodoList());
        const todoList = jsonData[sessionTable.get(sessionID)];
        response.write(JSON.stringify(todoList));
        response.end();
    } else throw Error(`[Server - Error] Session ID is not saved after Login. ( Show Item )`);
}
////////////////////////////////////////////////////////////////////////////

const post = async (request, response) => {
    switch (request.url) {
        case '/add'         : addItem(request, response);    break;
        case '/delete'      : deleteItem(request, response); break;
        case '/update'      : updateItem(request, response); break;
        case '/signInCheck' : signIn(request, response);     break;
        case '/signUpCheck' : signUp(request, response);     break;
        case '/signOut'     : signOut(request, response);    break;
        default             : error(response);               break;
    }
}

const get = async (request, response) => {
    if (await isExistSessionID(request.headers.cookie)) {
        switch (request.url) { 
            case '/'        : 
            case '/signIn?' : 
            case '/signUp?' : redirect(response, '/todoList');          break;
            case '/show'    : showItem(request, response);              break;
            default         : staticFile.load(request.url, response);   break;
        }
    } else {
        switch (request.url) {
            case '/todoList': redirect(response, '/signIn?');           break;
            default         : staticFile.load(request.url, response);   break;
        }
    }
}

const serverEventEmitter = http.createServer((request, response) => {
    switch (request.method) {
        case 'POST' : post(request, response);  break;
        case 'GET'  : get(request, response);   break;
        default     : error(response);          break;
    }
});

module.exports = serverEventEmitter;
