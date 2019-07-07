const SessionManager    = require('./manager/session_manager');
const TodoListManager   = require('./manager/todoList_manager');
const MemberManager     = require('./manager/member_manager');
const utilCookies       = require('./util/cookie_parser');
const staticFile        = require('./static_file');
const httpStatus        = require('./http_status');
const http              = require('http');
const fs                = require('fs');

const sessionManager    = new SessionManager(utilCookies);
const todoListManager   = new TodoListManager(fs);
const memberManager     = new MemberManager(fs);

const receiveData = (request) => {
    return new Promise((resolve) => {
        let body = '';
        request.on('data', (chunk) => body += chunk).on('end', () => resolve(JSON.parse(body)));
    });
}

const isExistPassword = async (input) => {
    const member = JSON.parse(await memberManager.readMemberInfo());
    return (member[input.id] === input.pw) ? true : false;
}

const signIn = async (request, response) => {
    console.time(`[ Server ] Sign In process `);
    const input = await receiveData(request);
    if (await isExistPassword(input)) {
        const cookies = [`SID=${sessionManager.createSession(input.id)}; Max-Age=${sessionManager.getMaxAge()}; HttpOnly`];
        response.statusCode = httpStatus.FOUND;
        response.setHeader('Set-Cookie', cookies);
    } else response.statusCode = httpStatus.FORBIDDEN;
    response.end();
    console.timeEnd(`[ Server ] Sign In process `);
}

const isNotExistMember = async (input) => {
    const member = JSON.parse(await memberManager.readMemberInfo());
    return (member[input.id] === undefined) ? true : false;
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
    if(sessionManager.isValid(request.headers.cookie)) {
        const sessionID = sessionManager.getSession(request.headers.cookie);
        sessionManager.deleteSession(sessionID);
    }
    response.statusCode = httpStatus.FOUND;
    response.end();
    console.timeEnd(`[ Server ] Sign Out process `);
}

const error = async (response) => {
    response.statusCode = httpStatus.NOT_FOUND;
    response.end();
}

const redirect = async (response, url) => {
    response.statusCode = httpStatus.FOUND;
    response.setHeader('location', `${url}`);
    response.end();
}

const addTodo = async (request, response) => {
    if(sessionManager.isValid(request.headers.cookie)) {
        const data      = await receiveData(request);
        const sessionID = sessionManager.getSession(request.headers.cookie);
        const todoList  = JSON.parse(await todoListManager.readTodoList());
        const userID    = JSON.parse(sessionManager.getValue(sessionID)).id;
        todoList[userID][data.type].splice(data.index, 0, data.value);
        todoListManager.writeTodoList(JSON.stringify(todoList));
        response.statusCode = httpStatus.OK;
    } else response.statusCode = httpStatus.FOUND;
    response.end();
}

const deleteTodo = async (request, response) => {
    if(sessionManager.isValid(request.headers.cookie)) {
        const data      = await receiveData(request);
        const sessionID = sessionManager.getSession(request.headers.cookie);
        const todoList  = JSON.parse(await todoListManager.readTodoList());
        const userID    = JSON.parse(sessionManager.getValue(sessionID)).id;
        todoList[userID][data.type].splice(data.index, 1);
        todoListManager.writeTodoList(JSON.stringify(todoList));
        response.statusCode = httpStatus.OK;
    } else response.statusCode = httpStatus.FOUND;
    response.end();
}

const updateTodo = async (request, response) => {
    if(sessionManager.isValid(request.headers.cookie)) {
        const data      = await receiveData(request);
        const sessionID = sessionManager.getSession(request.headers.cookie);
        const todoList  = JSON.parse(await todoListManager.readTodoList());
        const userID    = JSON.parse(sessionManager.getValue(sessionID)).id;
        const [addValue] = todoList[userID][data.deleteType].splice(data.deleteIndex, 1);
        if (data.deleteType === data.addType && data.deleteIndex < data.addIndex) data.addIndex--;
        todoList[userID][data.addType].splice(data.addIndex, 0, addValue);
        todoListManager.writeTodoList(JSON.stringify(todoList));
        response.statusCode = httpStatus.OK;
    } else response.statusCode = httpStatus.FOUND;
    response.end();
}

const showTodo = async (request, response) => {
    if(sessionManager.isValid(request.headers.cookie)) {
        const sessionID = sessionManager.getSession(request.headers.cookie);
        const todoList  = JSON.parse(await todoListManager.readTodoList());
        const userID    = JSON.parse(sessionManager.getValue(sessionID)).id;
        response.write(JSON.stringify(todoList[userID]));
        response.statusCode = httpStatus.OK;
    } else response.statusCode = httpStatus.FOUND;
    response.end();
}

const post = async (request, response) => {
    switch (request.url) {
        case '/addTodo'     : addTodo(request, response);       break;
        case '/showTodo'    : showTodo(request, response);      break;
        case '/deleteTodo'  : deleteTodo(request, response);    break;
        case '/updateTodo'  : updateTodo(request, response);    break;
        case '/signInCheck' : signIn(request, response);        break;
        case '/signUpCheck' : signUp(request, response);        break;
        case '/signOut'     : signOut(request, response);       break;
        default             : error(response);                  break;
    }
}

const get = async (request, response) => {
    if (sessionManager.isValid(request.headers.cookie)) {
        switch (request.url) {
            case '/'        :
            case '/signIn?' :
            case '/signUp?' : redirect(response, '/todoList');                  break;
            default         : staticFile.load(request, response, httpStatus);   break;
        }
    } else {
        switch (request.url) {
            case '/todoList' : redirect(response, '/signIn?');                  break;
            default          : staticFile.load(request, response, httpStatus);  break;
        }
    }
}

const serverEventEmitter = http.createServer((request, response) => {
    switch (request.method) {
        case 'POST'     : post(request, response);  break;
        case 'GET'      : get(request, response);   break;
        // case 'DELETE'   : break;
        // case 'PUT'      : break;
        // case 'PATCH'    : break;
    }
});

module.exports = serverEventEmitter;
