const request = require('supertest');
const server  = require('../server');

describe('Todo Web 서버 테스트', () => {
    test('메인 페이지 로드', (done) => {
        request(server)
        .get('/')
        .expect(200)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    test('회원 가입 실패 ( 회원 정보가 존재할 경우 )', (done) => {
        request(server)
        .post('/signUpCheck')
        .send(JSON.stringify({id : 'hyodol', pw : '1234'}))
        .set('Accept', 'application/json')
        .expect(403)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    test('회원 가입', (done) => {
        const min = 1000, max = 9999
        const id = 'testID' + Math.floor(Math.random() * (max - min + 1));
        request(server)
        .post('/signUpCheck')
        .send(JSON.stringify({id : id, pw : '1234'}))
        .set('Accept', 'application/json')
        .expect(302)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    test('로그인 실패', (done) => {
        request(server)
        .post('/signInCheck')
        .send(JSON.stringify({id : 'hyodol', pw : '1234598'}))
        .set('Accept', 'application/json')
        .expect(403)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    let cookies = undefined;
    test('로그인', (done) => {
        request(server)
        .post('/signInCheck')
        .send(JSON.stringify({id : 'hyodol', pw : '1234'}))
        .set('Accept', 'application/json')
        .expect(302)
        .end((error, response) => {
            if (error) throw error;
            cookies = response.header['set-cookie'][0];
            expect(response.header['set-cookie'].length).toEqual(1);
            done();
        });
    });

    test('로그인 후, TodoList 페이지로 이동', (done) => {
        request(server)
        .get('/todoList')
        .set('Cookie', [ cookies ])
        .expect(200)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    test('로그인 후, TodoList를 보여주려고 하는데 쿠키가 없을때', (done) => {
        request(server)
        .post('/showTodo')
        .set('Cookie', [])
        .expect(302)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    let responseObject = null;
    test('로그인 후, todoList를 목록을 보여주는지', (done) => {
        request(server)
        .post('/showTodo')
        .set('Cookie', [ cookies ])
        .expect(200)
        .end((error, response) => {
            if (error) throw error;
            const responseData = [];
            if (response.text !== "") {
                responseObject = JSON.parse(response.text);
                responseData.push(responseObject);
            } 
            expect(responseData.length).toEqual(1);
            done();
        });
    });

    test('로그인 후, todo 카테고리에 item 추가(쿠키가 없을때)', (done) => {
        const todoLength = responseObject.todo.length;
        request(server)
        .post('/addTodo')
        .send(JSON.stringify({ type : 'todo', index : todoLength, value : 'todo error' }))
        .set('Accept', 'application/json')
        .set('Cookie', [])
        .expect(302)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    test('로그인 후, todo 카테고리에 item 추가', (done) => {
        const todoLength = responseObject.todo.length;
        request(server)
        .post('/addTodo')
        .send(JSON.stringify({ type : 'todo', index : todoLength, value : 'TestCode 작성1' }))
        .set('Accept', 'application/json')
        .set('Cookie', [ cookies ])
        .expect(200)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    test('로그인 후, doing 카테고리에 item 추가(쿠키가 없을때)', (done) => {
        const doingLength = responseObject.doing.length;
        request(server)
        .post('/addTodo')
        .send(JSON.stringify({ type : 'doing', index : doingLength, value : 'doing error' }))
        .set('Accept', 'application/json')
        .set('Cookie', [])
        .expect(302)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    test('로그인 후, doing 카테고리에 item 추가', (done) => {
        const doingLength = responseObject.doing.length;
        request(server)
        .post('/addTodo')
        .send(JSON.stringify({ type : 'doing', index : doingLength, value : 'TestCode 작성2' }))
        .set('Accept', 'application/json')
        .set('Cookie', [ cookies ])
        .expect(200)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    test('로그인 후, done 카테고리에 item 추가(쿠키가 없을때)', (done) => {
        const doneLength = responseObject.done.length;
        request(server)
        .post('/addTodo')
        .send(JSON.stringify({ type : 'done', index : doneLength, value : 'done error' }))
        .set('Accept', 'application/json')
        .set('Cookie', [])
        .expect(302)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    test('로그인 후, done 카테고리에 item 추가', (done) => {
        const doneLength = responseObject.done.length;
        request(server)
        .post('/addTodo')
        .send(JSON.stringify({ type : 'done', index : doneLength, value : 'TestCode 작성3' }))
        .set('Accept', 'application/json')
        .set('Cookie', [ cookies ])
        .expect(200)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    test('로그인 후, todo 카테고리에 item 삭제(쿠키가 없을때)', (done) => {
        const todoLength = responseObject.todo.length;
        request(server)
        .post('/deleteTodo')
        .send(JSON.stringify({ type : 'todo', index : todoLength}))
        .set('Accept', 'application/json')
        .set('Cookie', [])
        .expect(302)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    test('로그인 후, todo 카테고리에 item 삭제', (done) => {
        const todoLength = responseObject.todo.length;
        request(server)
        .post('/deleteTodo')
        .send(JSON.stringify({ type : 'todo', index : todoLength}))
        .set('Accept', 'application/json')
        .set('Cookie', [ cookies ])
        .expect(200)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    test('로그인 후, doing 카테고리에 item 삭제(쿠키가 없을때)', (done) => {
        const doingLength = responseObject.doing.length;
        request(server)
        .post('/deleteTodo')
        .send(JSON.stringify({ type : 'doing', index : doingLength}))
        .set('Accept', 'application/json')
        .set('Cookie', [])
        .expect(302)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    test('로그인 후, doing 카테고리에 item 삭제', (done) => {
        const doingLength = responseObject.doing.length;
        request(server)
        .post('/deleteTodo')
        .send(JSON.stringify({ type : 'doing', index : doingLength}))
        .set('Accept', 'application/json')
        .set('Cookie', [ cookies ])
        .expect(200)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    test('로그인 후, done 카테고리에 item 삭제(쿠키가 없을때)', (done) => {
        const doneLength = responseObject.done.length;
        request(server)
        .post('/deleteTodo')
        .send(JSON.stringify({ type : 'done', index : doneLength}))
        .set('Accept', 'application/json')
        .set('Cookie', [])
        .expect(302)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    test('로그인 후, done 카테고리에 item 삭제', (done) => {
        const doneLength = responseObject.done.length;
        request(server)
        .post('/deleteTodo')
        .send(JSON.stringify({ type : 'done', index : doneLength }))
        .set('Accept', 'application/json')
        .set('Cookie', [ cookies ])
        .expect(200)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    test('로그인 후, 같은 카테고리에서 item 이동(쿠키가 없을때)', (done) => {
        request(server)
        .post('/updateTodo')
        .send(JSON.stringify({ deleteType : 'todo', deleteIndex : 1, addType : 'todo', addIndex : 3 }))
        .set('Accept', 'application/json')
        .set('Cookie', [])
        .expect(302)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    test('로그인 후, 같은 카테고리에서 item 이동', (done) => {
        request(server)
        .post('/updateTodo')
        .send(JSON.stringify({ deleteType : 'todo', deleteIndex : 1, addType : 'todo', addIndex : 3 }))
        .set('Accept', 'application/json')
        .set('Cookie', [ cookies ])
        .expect(200)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    test('로그인 후, todo -> doing 으로 아이템 이동(쿠키가 없을때)', (done) => {
        request(server)
        .post('/updateTodo')
        .send(JSON.stringify({ deleteType : 'todo', deleteIndex : 0, addType : 'doing', addIndex : 1 }))
        .set('Accept', 'application/json')
        .set('Cookie', [])
        .expect(302)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    test(`Session ID 일치하는 경우 ( '/' GET 요청 -> '/todoList' 리다이렉트 )`, (done) => {
        request(server)
        .get('/')
        .set('Cookie', [ cookies ])
        .expect(302)
        .end((error, response) => {
            if (error) throw error;
            done();
        }) 
    });

    test(`Session ID 일치하는 경우 ( '/signIn?' GET 요청 -> '/todoList' 리다이렉트 )`, (done) => {
        request(server)
        .get('/signIn?')
        .set('Cookie', [ cookies ])
        .expect(302)
        .end((error, response) => {
            if (error) throw error;
            done();
        }) 
    });

    test(`Session ID 일치하는 경우 ( '/signUp?' GET 요청 -> '/todoList' 리다이렉트 )`, (done) => {
        request(server)
        .get('/signUp?')
        .set('Cookie', [ cookies ])
        .expect(302)
        .end((error, response) => {
            if (error) throw error;
            done();
        }) 
    });

    test('로그 아웃 요청 (쿠키가 있을때)', (done) => {
        request(server)
        .post('/signOut')
        .set('Cookie', [ cookies ])
        .expect(302)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    test('로그 아웃 요청 (쿠키가 없을때)', (done) => {
        request(server)
        .post('/signOut')
        .set('Cookie', [])
        .expect(302)
        .end((error, response) => {
            if (error) throw error;
            done();
        });
    });

    test(`쿠키 정보가 없이 todoList 페이지 요청하는 경우 ( '/signIn?' 리다이렉트 )`, (done) => {
        request(server)
        .get('/todoList')
        .set('Cookie', [])
        .expect(302)
        .end((error, response) => {
            if (error) throw error;
            done();
        }) 
    });

    test(`쿠키 정보가 있지만, Session ID가 존재하지 않는 상태에서 todoList 페이지 요청하는 경우 ( '/signIn?' 리다이렉트 )`, (done) => {
        request(server)
        .get('/todoList')
        .set('Cookie', [ `SID=1111; Max-Age=2592000; HttpOnly` ])
        .expect(302)
        .end((error, response) => {
            if (error) throw error;
            done();
        }) 
    });

    test('존재하지 않는 페이지 요청 (GET, 쿠키 정보 없음)', (done) => {
        request(server)
        .get('/error')
        .set('Cookie', [])
        .expect(404)
        .end((error, response) => {
            if (error) throw error;
            done();
        }) 
    });

    test('존재하지 않는 페이지 요청 (GET)', (done) => {
        request(server)
        .get('/error')
        .set('Cookie', [ cookies ])
        .expect(404)
        .end((error, response) => {
            if (error) throw error;
            done();
        }) 
    });

    test('존재하지 않는 페이지 요청 (POST)', (done) => {
        request(server)
        .post('/error')
        .expect(404)
        .end((error, response) => {
            if (error) throw error;
            done();
        }) 
    });
});