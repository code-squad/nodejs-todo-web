const fs = require('fs');

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