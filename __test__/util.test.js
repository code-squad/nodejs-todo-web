const util = require('../util');
const path = require('path');

describe('파일 확장자 테스트', () => {
  it('단일 확장자', (done) => {
    expect(util.getFileExtentsion('aosdjgiojiosjdo/jsidjiwjqwd.js')).toEqual('js');
    done();
  });
  it('중첩된 확장자', (done) => {
    expect(util.getFileExtentsion('__test__/app.test.ts')).toEqual('ts');
    done();
  });
  it('MIME 타입 테스트 - 정상적인 경우', (done) => {
    expect(util.getMimeType('css')).toEqual('text/css');
    done();
  });
  it('MIME 타입 테스트 - 체크할 수 없는 경우', (done) => {
    expect(util.getMimeType('mp4')).toEqual('text/plain');
    done();
  });
  it('파일 경로 만들기', (done) => {
    expect(util.makeFilePath('public/index.html')).toEqual(path.join(process.cwd(), 'public/index.html'));
    done();
  });
});