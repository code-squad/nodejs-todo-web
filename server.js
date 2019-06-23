const fs = require('fs');
const path = require('path');
const http = require('http');
// const cookie      = require('cookie');
const queryString = require('querystring');
const httpStatus = require('./http_status');
const utility = require('./utility');
const mime = require('./mime');

const convert = (url) => {
    const convertURL = {
        '/'             : '/index.html',
        '/signInPage'   : '/signIn.html',
        '/signUpPage'   : '/signUp.html',
        '/todoListPage' : '/todoList.html',
    }
    return (convertURL[url] === undefined) ? url : convertURL[url];
}

const loadStaticFile = async (requestURL, response) => {
    console.log(`>> load static file`);
    const url = convert(requestURL);
    const extension = utility.parse(url);
    response.writeHeader(httpStatus.OK, { 'Content-Type': mime[extension] });
    fs.createReadStream(path.join(__dirname, url)).pipe(response);
}

const readMemberInfo = () => {
    return new Promise((resolve) => {
        console.log(`>> read file`);
        fs.readFile('./member_Information.csv', 'utf-8', (error, data) => resolve(`{${data.substr(0, data.length - 1)}}`));
    });
}

const checkMember = async (input) => {
    const member = JSON.parse(await readMemberInfo());
    return (member[input.id] === input.pw) ? true : false;
}

const writeMemberInfo = async (input) => {
    console.log(`>> write file`);
    const writeData = `"${input.id}":"${input.pw}",`;
    const option = { encoding: 'utf-8', flag: 'a' };
    fs.appendFile('./member_Information.csv', writeData, option);
}

const signIn = async (input) => {
    console.log(`sign in check`);
    if (await checkMember(input)) {
        // 세션 ID 발급
        // 쿠키에 SID 정보 저장..
        // todoList.html 이동 및 DB에서 정보 가져오기
        return true;
    }
    return false;
}

const signUp = async (input) => {
    console.log(`sign up check`);
    if (!await checkMember(input)) {
        writeMemberInfo(input);
        return true;
    }
    return false;
}

const receiveData = (request) => {
    return new Promise((resolve) => {
        let body = '';
        request.on('data', (chunk) => body += chunk).on('end', () => resolve(queryString.parse(body)));
    });
}

const sign = async (request, response) => {
    const input = await receiveData(request);
    if (request.url === '/signInCheck') {
        if (await signIn(input)) loadStaticFile('/todoListPage', response);
        else loadStaticFile('/signInPage', response);
    } else if (request.url === '/signUpCheck') {
    }
}

const serverEventEmitter = http.createServer((request, response) => {
    if (request.headers.cookie === undefined) {
        if (request.method === 'GET') loadStaticFile(request.url, response);
        else if (request.method === 'POST') {
            switch(request.url) {
                case '/signInPage': case '/signUpPage': loadStaticFile(request.url, response); break;
                case '/signInCheck': case '/signUpCheck': sign(request, response); break;
                case 'signOut': break;
            }
        } else {
            response.statusCode = httpStatus.NOT_FOUND;
            response.end();
        }
    } else {
        // 쿠키 정보를 분석한다.
        // 쿠키에 있는 세션 ID와 세션 테이블의 ID가 일치하면.. todoList.html 이동 및 DB에서 정보 가져오기
        // 일치하지 않으면.. 로그인 페이지로 이동
    }
});

module.exports = serverEventEmitter;
