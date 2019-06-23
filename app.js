const http = require('http');
const fs = require('fs');
const path = require('path');
const makeIndexHtmlText = require('./template');
const { getFileExtentsion, makeFilePath, getMimeType } = require('./util');

let todoSets;
let todoLists;

const server = http.createServer(async (request, response) => {
  try {
    const result = await require('./db').read();
    todoSets = result.todoSets;
    todoLists = result.todoLists;
  } catch (error) {
    console.error(error);
    process.exit(254);
  }

  request.on('error', (err) => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', (err) => {
    console.error(err);
  });

  if (request.method === 'GET' && request.url === '/') {
    response.setHeader('Content-Type', 'text/html');
    response.write(makeIndexHtmlText(todoLists, todoSets));
    response.end();
  } else if (request.method === 'GET' && RegExp(/\/public/).test(request.url)) {
    response.setHeader('Content-Type', getMimeType(getFileExtentsion(request.url)));
    response.write(fs.readFileSync(makeFilePath(request.url)));
    response.end();
  } else if (request.method === 'POST' && RegExp(/\/todo/).test(request.url)) {
    // TODO:  todo create 로직
    response.setHeader('Content-Type', 'application/json');
    response.write({});
    response.end();
  } else if (request.method === 'PUT' && RegExp(/\/todo/).test(request.url)) {
    // TODO: todo 업데이트 로직
    response.setHeader('Content-Type', 'application/json');
    response.write({});
    response.end();
  } else if (request.url === '/data') {
    response.statusCode = 403;
    response.end();
  } else {
    response.statusCode = 404;
    response.end();
  }
});

module.exports = server;
