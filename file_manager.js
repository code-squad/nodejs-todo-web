const utility       = require('./utility');
const mime          = require('./mime');
const path          = require('path');
const fs            = require('fs');

const convert = (url) => {
    const convertURL = {
        '/'             : '/index.html',
        '/signIn?'      : '/signIn.html',
        '/signUp?'      : '/signUp.html',
        '/todoList'     : '/todoList.html',
    }
    return (convertURL[url] === undefined) ? url : convertURL[url];
}

module.exports.loadStaticFile = async (requestURL, response) => {
    console.time(`[ Load ] '${requestURL}' file `);
    const url = convert(requestURL);
    const extension = await utility.getExtension(url);
    response.setHeader('Content-Type', mime[extension]);
    fs.createReadStream(path.join(__dirname, url)).pipe(response);
    console.timeEnd(`[ Load ] '${requestURL}' file `);
}

module.exports.readMemberInfo = () => {
    return new Promise((resolve) => {
        console.time(`[ Read ] member information `);
        fs.readFile('./member_Information.csv', 'utf-8', (error, data) => {
            if (error) throw error;
            resolve(`{${data.substr(0, data.length - 1)}}`);
        });
        console.timeEnd(`[ Read ] member information `);
    });
}

module.exports.writeMemberInfo = async (input) => {
    console.time(`[ Save ] member information `);
    const writeData = `"${input.id}":"${input.pw}",`;
    const option = { encoding: 'utf-8', flag: 'a' };
    fs.appendFile('./member_Information.csv', writeData, option, (error) => {
        if (error) throw error;
        console.log("Member is appended to file successfully.");
    });
    console.timeEnd(`[ Save ] member information `);
}