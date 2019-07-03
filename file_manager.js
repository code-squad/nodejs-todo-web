const utility       = require('./utility');
const mime          = require('./mime');
const path          = require('path');
const fs            = require('fs');

module.exports.loadStaticFile = async (requestURL, response) => {
    console.time(`[ Member Mananger ] Load '${requestURL}' file `);
    const url = utility.convert(requestURL);
    const extension = utility.getExtension(url);
    response.setHeader('Content-Type', mime[extension]);
    fs.createReadStream(path.join(__dirname, url)).pipe(response);
    console.timeEnd(`[ Member Mananger ] Load '${requestURL}' file `);
}

module.exports.readMemberInfo = () => {
    return new Promise((resolve) => {
        console.time(`[ Member Mananger ] Read member information `);
        fs.readFile('./db/member_Information.csv', 'utf-8', (error, data) => {
            if (error) throw error;
            resolve(`{${data.substr(0, data.length - 1)}}`);
        });
        console.timeEnd(`[ Member Mananger ] Read member information `);
    });
}

module.exports.writeMemberInfo = async (input) => {
    console.time(`[ Member Mananger ] Save member information `);
    const writeData = `"${input.id}":"${input.pw}",`;
    const option = { encoding: 'utf-8', flag: 'a' };
    fs.appendFile('./db/member_Information.csv', writeData, option, (error) => {
        if (error) throw error;
        console.log("Member is appended to file successfully.");
    });
    console.timeEnd(`[ Member Mananger ] Save member information `);
}