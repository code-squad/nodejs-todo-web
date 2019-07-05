module.exports = class UserManager {
    constructor(fileSystem) {
        this.fileSystem = fileSystem;
        this.data;
    }

    async logIn(id, pw, test) {
        return await this.readUserData(id, pw, test);
    }

    async signUp(id, pw, test) {
        await this.loadData(test);
        if (!(await this.isMember(id, pw, test, 'signup'))) {
            return false;
        } else {
            const tempInfo = new User(id, pw);
            this.data[id] = tempInfo;
            await this.updateUserData(id, test);
            return this.data[id];
        }

    }

    async createDataFile(test) {
        if(test){
            const fileExist = await this.myExistFile('./data');
            if (!fileExist) {
                this.fileSystem.mkdirSync('./data');
            }
            await this.myWriteFile('./data/testUserData.txt', '{}', 'utf8');
        }else{
            const fileExist = await this.myExistFile('./data');
            if (!fileExist) {
                this.fileSystem.mkdirSync('./data');
            }
            await this.myWriteFile('./data/userData.txt', '{}', 'utf8');
        }
    }

    async loadData(test) {
        if(test){
            const fileExist = await this.myExistFile('./data/testUserData.txt');
            if (!fileExist) {
                await this.createDataFile(test);
            }
            return this.data = JSON.parse((await this.myReadFile('./data/testUserData.txt')).toString());
        }
        const fileExist = await this.myExistFile('./data/userData.txt');
        if (!fileExist) {
            await this.createDataFile();
        }
        this.data = JSON.parse((await this.myReadFile('./data/userData.txt')).toString());
    }

    async isMember(id, pw, test, option) {
        await this.loadData(test);
        if (option) {
            if (id in this.data) {
                return false;
            }
            return true;
        }
        if (id in this.data) {
            if (this.data[id].pw === pw) {
                return this.data[id];
            }
        }
        return false
    }

    async readUserData(id, pw, test) {
        return await this.isMember(id, pw, test);
    }

    async writeData(test) {
        if(test){
            return await this.myWriteFile('./data/testUserData.txt', JSON.stringify(this.data));
        }
        await this.myWriteFile('./data/userData.txt', JSON.stringify(this.data));
    }

    async updateUserData(id, test) {
        const tempInfo = this.data[id];
        await this.loadData(test);
        this.data[id] = tempInfo;
        await this.writeData(test);
    }

    async saveData(id, data, test) {
        this.data[id].data = data;
        await this.updateUserData(id, test);
    }


    myReadFile(path) {
        return new Promise(resolve => {
            this.fileSystem.readFile(path, (err, data) => {
                resolve(data);
            });
        });
    }

    myWriteFile(path, userData, option) {
        return new Promise(resolve => {
            this.fileSystem.writeFile(path, userData, option, (err, data) => {
                resolve();
            });
        })
    }

    myExistFile(path) {
        return new Promise((resolve, reject) => {
            this.fileSystem.stat(path, (err, stats) => {
                resolve(stats);
            });
        });
    }
}

class User {
    constructor(id, pw) {
        this.id = id;
        this.pw = pw;
        this.data = [['todo'], ['doing'], ['done']];
    }
}