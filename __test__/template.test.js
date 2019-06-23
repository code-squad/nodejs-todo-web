const makeIndexHtmlText = require('../template');
const { mockTodoLists, mockTodos, mockHtml } = require('../__mocks__/template.mock');

test('템플릿 점검', (done) => {
  expect(makeIndexHtmlText(mockTodoLists, mockTodos)).toEqual(mockHtml);
  done();
})
