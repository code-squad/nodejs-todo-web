module.exports = class Controller {
    constructor(httpStatusCode, fs, session, cookie, userManager) {
        this.httpStatusCode = httpStatusCode;
        this.fs = fs;
        this.session = session;
        this.cookie = cookie;
        this.userManager = userManager;
        this.maxAge = 60 * 60 / 2;
        this.userData;
    }
 
    async static(request, response, url) {
        return response.end(await this.userManager.myReadFile(__dirname+'/../public'+ url));

    }

    async get(request, response, url) {
        let status;
        if (url === '/' || url === '/login') {
            if (request.headers.cookie) {
                const cookies = this.cookie.parse(request.headers.cookie);
                const sessionData = this.session.isValidSessionID(cookies.sessionID);
                if (sessionData) {
                    status = 'FOUND';
                    response.writeHead(this.httpStatusCode[status], this.setHeadObject('./index', sessionData.sessionID, this.maxAge));
                    return this.static(request, response, '/login.html');
                }
            }
            status = 'OK';
            response.writeHead(this.httpStatusCode[status])
            return this.static(request, response, '/login.html');
        }

        if (url === '/index') {
            if (request.headers.cookie) {
                const cookies = this.cookie.parse(request.headers.cookie);
                const sessionData = this.session.isValidSessionID(cookies.sessionID);
                if (sessionData) {
                    return this.static(request, response, '/index.html');
                }

            }
            status = 'FOUND';
            response.writeHead(this.httpStatusCode[status], this.setHeadObject('./login', '', 0));
            return this.static(request, response, '/login.html');
        }
    
        if( url === '/index/userData'){
            if (request.headers.cookie) {
                const cookies = this.cookie.parse(request.headers.cookie);
                const sessionData = this.session.isValidSessionID(cookies.sessionID);
                if (sessionData) {
                    this.userData = await this.userManager.readUserData(sessionData.id, sessionData.pw);
                    status = 'OK';
                    response.writeHead(this.httpStatusCode[status], this.setHeadObject('./index', sessionData.sessionID,this.maxAge));
                    return response.end(JSON.stringify({'id': this.userData.id, data: this.userData.data}));
                }
            }
            status = 'FOUND';
            response.writeHead(this.httpStatusCode[status], this.setHeadObject('./login','', 0));
            return this.static(request, response, '/login.html');
        }
    }

    post(request, response, url) {
        let status;
        let body = '';
        if(url === '/login'){
            request.on('data', (data) => {
                body += data;
            });
            return request.on('end', async () => {
                const [id, pw] = [JSON.parse(body).id, JSON.parse(body).pw];
                const userInfo = await this.userManager.logIn(id, pw);
                if (!userInfo) {
                    status = 'CONFLICT';
                    return this.error(request,response,status);
                } else {
                    const sessionData = this.session.getSessionID(userInfo);
                    status = 'FOUND';
                    response.writeHead(this.httpStatusCode[status], this.setHeadObject('./index', sessionData.sessionID, this.maxAge));
                    return response.end("Logged in");
                } 
            });
        }

        if(url === '/signup'){
            request.on('data', (data) => {
                body += data;
            });
            return request.on('end', async () => {
                const [id, pw] = [JSON.parse(body).id, JSON.parse(body).pw];
                const userInfo = await this.userManager.signUp(id, pw);
                if (!userInfo) {
                    status = 'CONFLICT';
                    return this.error(request,response,status);
                } else {
                    const sessionData = this.session.getSessionID(userInfo);
                    status = 'FOUND';
                    response.writeHead(this.httpStatusCode[status], this.setHeadObject('./index', sessionData.sessionID, this.maxAge));
                    return response.end("Sign Up");
                }
            });
        }

        if (url === '/index/logout') {
            status = 'FOUND';
            response.writeHead(this.httpStatusCode[status], this.setHeadObject('../login', '', 0));
            return response.end(status);
        }
    }

    put(request, response, url) {
        let body = '';
        if (url === '/index/saveData') {
            request.on('data', (data) => {
                body += data;
            });
            return request.on('end', async () => {
                const [id, userData] = [JSON.parse(body).id, JSON.parse(body).userData];
                this.userManager.saveData(id, userData);
                return response.end("saved data");
            });

        }
    }

    error(request, response, status) {
        response.writeHead(this.httpStatusCode[status], status);
        response.end(status);
    }


    setHeadObject(location, sessionID, maxAge = 0) {
        return {
            'Location': location,
            'Content-Type': 'text/html',
            'Set-Cookie': [`sessionID = ${sessionID}; Path = /; Max-Age = ${maxAge}`]
        }
    }


}