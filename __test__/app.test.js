const request = require('supertest');
const fs = require('fs');
const path = require('path');
const server = require('../app');
const { parseCookie } = require('../util');

jest.setTimeout(10 * 1000);

function sleep(ms){
   return new Promise(resolve=>{
       setTimeout(resolve,ms)
   })
}

describe('TODO 서버 테스트', () => {
  const agent = request.agent(server);
  const wrongId = 'test2', userId = 'test', wrongPassword = '1234', password = 'aaaa';
  const dataDir = path.join(process.cwd(), 'data');

  let sessionId = '';

  beforeAll(async done => {
    try {
      await fs.promises.access((dataDir), fs.F_OK);
      done();
    } catch (error) {
      if(error.errno === -2) {
        await fs.promises.mkdir(dataDir);
        done();
      } else {
        console.error('디렉토리 생성 실패');
        done(error);
      }
    }
  });

  it('최초 실행 시 로그인 페이지 로드 성공 여부 확인', done => {
    agent.get('/').then(res => {
      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  it('회원가입 페이지 열기', done => {
    agent.get('/signup')
         .send()
         .set('Accept', 'application/json')
         .expect(200)
         .end((err, res) => {
           if(err) return done(err);
           done();
         });
  });

  it('회원가입 시도', done => {
    agent.post('/signup')
         .send({userId, password})
         .set('Accept', 'application/json')
         .expect(302)
         .end((err, res) => {
           if(err) return done(err);
           done();
         });
  });

  it('이미 정보가 있는 ID로 회원가입 시도', done => {
    agent.post('/signup')
         .send({userId, password})
         .set('Accept', 'application/json')
         .expect(409)
         .end((err, res) => {
           if(err) return done(err);
           done();
         });
  });

  it('잘못된 로그인 시도 - 비밀번호 불일치', done => {
    agent.post('/login')
         .send({userId, password: wrongPassword})
         .set('Accept', 'application/json')
         .expect(403)
         .end((err, res) => {
           if(err) return done(err);
           done();
         });
  });

  it('잘못된 로그인 시도 - 존재하지 않는 아이디', done => {
    agent.post('/login')
         .send({userId: wrongId, password})
         .set('Accept', 'application/json')
         .expect(403)
         .end((err, res) => {
           if(err) return done(err);
           done();
         });
  });

  it('로그인 시도', done => {
    agent.post('/login')
         .send({userId, password})
         .set('Accept', 'application/json')
         .expect(302)
         .end((err, res) => {
           if(err) return done(err);
           const cookies = res.headers['set-cookie'].map(rawCookie => parseCookie(rawCookie));
           cookies.forEach(cookie => {
             if(cookie.hasOwnProperty('token')){
               sessionId = cookie.token;
             }
           });
           done();
         });
  });

  it('세션이 남아있을 경우 로그인 화면으로 요청을 보내면 todo로 리다이렉트', done => {
    agent.get('/')
         .send({userId, password})
         .set('cookie', `token=${sessionId};`)
         .expect(302)
         .end((err, res) => {
           if(err) return done(err);
           done();
         });
  });

  it('todo 조회', done => {
    agent.get('/todo')
         .send()
         .set('cookie', `token=${sessionId};`)
         .expect(200)
         .end((err, res) => {
           if(err) return done(err);
           done();
         });
  });

  it('todolist 생성', done => {
    agent.post('/todolist')
         .send({name: 'todo', position: 0})
         .set('cookie', `token=${sessionId};`)
         .expect(200)
         .end((err, res) => {
           if(err) return done(err);
           done();
         });
  });

  it('todo 생성', done => {
    agent.post('/todo')
         .send({name: 'Test 1', position: '0', todolist: 'todo'})
         .set('cookie', `token=${sessionId};`)
         .expect(200)
         .end((err, res) => {
           if(err) return done(err);
           done();
         });
  });  

  it('todo 생성2', done => {
    agent.post('/todo')
         .send({name: 'Test 1', position: '1', todolist: 'todo'})
         .set('cookie', `token=${sessionId};`)
         .expect(200)
         .end((err, res) => {
           if(err) return done(err);
           done();
         });
  });  

  it('todo 새로고침 시도', done => {
    agent.get('/todo')
         .send()
         .set('cookie', `token=${sessionId};`)
         .expect(200)
         .end((err, res) => {
           if(err) return done(err);
           done();
         });
  });  

  it('todo 이동', done => {
    agent.put('/todo')
         .send([
           {id: 1, name: 'Test 2', position: 0, todoListName: 'todo'},
           {id: 0, name: 'Test 1', position: 1, todoListName: 'todo'},
         ])
         .set('cookie', `token=${sessionId};`)
         .expect(200)
         .end((err, res) => {
           if(err) return done(err);
           done();
         });
  });

  it('todo 제거', done => {
    agent.delete('/todo')
         .send([
           {id: 0, name: 'Test 1', position: 1, todoListName: 'todo'},
         ])
         .set('cookie', `token=${sessionId};`)
         .expect(200)
         .end((err, res) => {
           if(err) return done(err);
           done();
         });
  });

  it('todolist 제거', done => {
    agent.delete('/todolist')
         .send({
           todos:[],
           todolists: []
          })
         .set('cookie', `token=${sessionId};`)
         .expect(200)
         .end((err, res) => {
           if(err) return done(err);
           done();
         });
  });


  it('정적 파일 요청', done => {
    agent.get('/public/index.css')
         .expect(200)
         .end((err, res) => {
           if(err) return done(err);
           done();
         });
  });

  it('존재하지 않는 파일 요청', done => {
    agent.get('/public/jest.css')
         .expect(404)
         .end((err, res) => {
           if(err) return done(err);
           done();
         });
  });

  it('data 디렉토리 접근 제한', done => {
    agent.get('/data/cocahack/account')
         .expect(403)
         .end((err, res) => {
           if(err) return done(err);
           done();
         });
  });

  it('처리할 수 없는 경로로 요청 보내기', done => {
    agent.get('/test')
         .expect(404)
         .end((err, res) => {
           if(err) return done(err);
           done();
         });
  });

  it('갑자기 파일 접근이 안될 때', async done => {
    try {
      const dataDir = path.join(process.cwd(), 'data');
      await fs.promises.unlink(path.join(dataDir, userId, 'todo'));
      agent.post('/todo')
      .send({name: 'Test 4', position: '2', todolist: 'todo'})
      .set('cookie', `token=${sessionId};`)
      .expect(500)
      .end((err, res) => {
        if(err) return done(err);
        done();
      });
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  it('세션 만료 후 todo 접근 시 로그인 화면으로 리다이렉트', async done => {
    await sleep(5 * 1000);
    agent.get('/todo')
        .send()  
        .set('cookie', `token=${sessionId};`)
        .expect(302)
        .end((err, res) => {
          if(err) done(err);
          done();
        });
  });

  it('세션 만료 후 todo 추가 요청 시 로그인 화면으로 리다이렉트', done => {
    agent.post('/todo')
    .send({name: 'Test 3', position: '0', todolist: 'todo'})
    .set('cookie', `token=${sessionId};`)
    .expect(302)
    .end((err, res) => {
      if(err) return done(err);
      done();
    });
  });

  it('세션 만료 후 todolist 추가 요청 시 로그인 화면으로 리다이렉트', done => {
    agent.post('/todolist')
    .send({name: 'doing', position: '1'})
    .set('cookie', `token=${sessionId};`)
    .expect(302)
    .end((err, res) => {
      if(err) return done(err);
      done();
    });
  });

  it('세션 만료 후 todo 이동 시 로그인 화면으로 리다이렉트', done => {
    agent.put('/todo')
    .send([
      {id: 1, name: 'Test 2', position: 0, todoListName: 'todo'},
      {id: 0, name: 'Test 1', position: 1, todoListName: 'todo'},
    ])
    .set('cookie', `token=${sessionId};`)
    .expect(302)
    .end((err, res) => {
      if(err) return done(err);
      done();
    });
  });

  it('세션 만료 후 todo Drag&Drop 이벤트 발생 시 로그인 화면으로 리다이렉트', done => {
    agent.put('/todo')
    .send([
      {id: 1, name: 'Test 2', position: 0, todoListName: 'todo'},
      {id: 0, name: 'Test 1', position: 1, todoListName: 'todo'},
    ])
    .set('cookie', `token=${sessionId};`)
    .expect(302)
    .end((err, res) => {
      if(err) return done(err);
      done();
    });
  });

  it('세션 만료 후 todo 제거 시 로그인 화면으로 리다이렉트', done => {
    agent.delete('/todo')
    .send([])
    .set('cookie', `token=${sessionId};`)
    .expect(302)
    .end((err, res) => {
      if(err) return done(err);
      done();
    });
  });

  it('세션 만료 후 todolist 제거 시 로그인 화면으로 리다이렉트', done => {
    agent.delete('/todolist')
    .send([])
    .set('cookie', `token=${sessionId};`)
    .expect(302)
    .end((err, res) => {
      if(err) return done(err);
      done();
    });
  });

  it('로그아웃 테스트를 위한 로그인 시도', done => {
    agent.post('/login')
         .send({userId, password})
         .set('Accept', 'application/json')
         .expect(302)
         .end((err, res) => {
           if(err) return done(err);
           const cookies = res.headers['set-cookie'].map(rawCookie => parseCookie(rawCookie));
           cookies.forEach(cookie => {
             if(cookie.hasOwnProperty('token')){
               sessionId = cookie.token;
             }
           });
           done();
         });
  });

  it('로그아웃 시도', done => {
    agent.post('/logout')
         .set('cookie', `token=${sessionId};`)
         .expect(302)
         .end((err, res) => {
           if(err) return done(err);
           done();
         });
  });

  afterAll(async done => {
    try {
      const dataDir = path.join(process.cwd(), 'data');
      await fs.promises.unlink(path.join(dataDir, userId, 'account'));
      // await fs.promises.unlink(path.join(dataDir, userId, 'todo'));
      await fs.promises.unlink(path.join(dataDir, userId, 'todolist'));
      await fs.promises.rmdir(path.join(dataDir, userId));
      done();
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

});