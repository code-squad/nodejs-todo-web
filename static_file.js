const staticFiles   = require('./util/static_file_parser');
const httpStatus    = require('./http_status');
const path          = require('path');
const fs            = require('fs');

const mime = {
    '.html'  : 'text/html', 
    '.css'   : 'text/css',
    '.js'    : 'text/javascript',
    '.png'   : 'image/png',
    '.ico'   : 'image/ico',
}

const convert = (url) => {
    const convertURL = {
        '/'         : '/public/index.html',
        '/signIn?'  : '/public/signIn.html',
        '/signUp?'  : '/public/signUp.html',
        '/todoList' : '/public/todoList.html',
    }
    return convertURL[url] === undefined ? url : convertURL[url];
}

module.exports.load = async (requestURL, response) => {
    console.time(`[ Static files ] Load '${requestURL}' file `);
    const url = convert(requestURL);
    const extension = staticFiles.parse(url);
    response.writeHead(httpStatus.OK, { 'Content-Type' : mime[extension] });
    fs.createReadStream(path.join(__dirname, url)).pipe(response);
    console.timeEnd(`[ Static files ] Load '${requestURL}' file `);
}