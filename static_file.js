const staticFileParser  = require('./util/static_file_parser');
const path  = require('path');
const fs    = require('fs');

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

module.exports.load = async (request, response, httpStatus) => {
    const url = convert(request.url);
    if (url.substr(0, 7) === '/public') {
        console.time(`[ Static files ] Load '${request.url}' file `);
        const extension = staticFileParser.getExtension(url);
        response.writeHead(httpStatus.OK, { 'Content-Type' : mime[extension] });
        fs.createReadStream(path.join(__dirname, url)).pipe(response);
        console.timeEnd(`[ Static files ] Load '${request.url}' file `);
    } else {
        response.statusCode = httpStatus.NOT_FOUND;
        response.end();
    }
}