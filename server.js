const fileManager   = require('./file_manager');
const queryString   = require('querystring');
//const cookie        = require('cookie');
const http          = require('http');

const checkMember = async (input) => {
    console.time(`>> check member`);
    const member = JSON.parse(await fileManager.readMemberInfo());
    console.timeEnd(`>> check member`);
    return (member[input.id] === input.pw) ? true : false;
}

const receiveData = (request) => {
    return new Promise((resolve) => {
        let body = '';
        console.time(`>> receive data`);
        request.on('data', (chunk) => body += chunk).on('end', () => resolve(queryString.parse(body)));
        console.timeEnd(`>> receive data`);
    });
}

const signIn = async (input) => {
    console.log(`${input.id}`);
    if (await checkMember(input)) {
        // 세션 ID 발급
        // 쿠키에 SID 정보 저장..
        // todoList.html 이동 및 DB에서 정보 가져오기
        return true;
    }
    return false;
}

const signUp = async (input) => {
    if (!await checkMember(input)) {
        fileManager.writeMemberInfo(input);
        return true;
    }
    return false;
}

const sign = async (request, response) => {
    console.time(`>> sign`);
    let nextPage = '';
    const input = await receiveData(request);
    switch (request.url) {
        case '/signInCheck': 
            nextPage = (await signIn(input)) ? '/todoListPage' : '/signInPage';
            break;
        case '/signUpCheck':  
            nextPage = (await signUp(input)) ? '/signInPage' : '/signUpPage';
            break;
    }
    fileManager.loadStaticFile(nextPage, response);
    console.timeEnd(`>> sign`);
}

const serverEventEmitter = http.createServer((request, response) => {
    if (request.headers.cookie === undefined) {
        if (request.method === 'GET') fileManager.loadStaticFile(request.url, response);
        else if (request.method === 'POST') {
            switch(request.url) {
                case '/signInPage': case '/signUpPage': 
                    fileManager.loadStaticFile(request.url, response); 
                    break;
                case '/signInCheck': case '/signUpCheck': 
                    sign(request, response); 
                    break;
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
