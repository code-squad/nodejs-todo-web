const httpStatus    = require('./http_status');
const utility       = require('./utility');
const mime          = require('./mime');
const path          = require('path');
const fs            = require('fs');

const convert = (url) => {
    const convertURL = {
        '/'             : '/index.html',
        '/signInPage'   : '/signIn.html',
        '/signUpPage'   : '/signUp.html',
        '/todoListPage' : '/todoList.html',
    }
    return (convertURL[url] === undefined) ? url : convertURL[url];
}

module.exports.loadStaticFile = async (requestURL, response) => {
    console.time(`>> load static`);
    const url = convert(requestURL);
    const extension = utility.parse(url);
    response.writeHeader(httpStatus.OK, { 'Content-Type': mime[extension] });
    fs.createReadStream(path.join(__dirname, url)).pipe(response);
    console.timeEnd(`>> load static`);
}

module.exports.readMemberInfo = () => {
    return new Promise((resolve) => {
        console.time(`>> read file`);
        fs.readFile('./member_Information.csv', 'utf-8', (error, data) => resolve(`{${data.substr(0, data.length - 1)}}`));
        console.timeEnd(`>> read file`);
    });
}

module.exports.writeMemberInfo = async (input) => {
    console.time(`>> write file`);
    const writeData = `"${input.id}":"${input.pw}",`;
    const option = { encoding: 'utf-8', flag: 'a' };
    fs.appendFile('./member_Information.csv', writeData, option, (error) => console.log("Member is appended to file successfully.") );
    console.timeEnd(`>> write file`);
}