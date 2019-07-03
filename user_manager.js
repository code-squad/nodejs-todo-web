module.exports = class UserManager {
    constructor(fileSystem) {
        this.fileSystem = fileSystem;
        this.data;
    }

    async logIn(id, pw) {
        return await this.readUserData(id, pw);
    }

    async signUp(id, pw) {
        await this.loadData();
        if(!(await this.isMember(id,pw,'signup'))){
            return false;
        }else{
            const tempInfo = new User(id,pw);
            this.data[id] = tempInfo;
            await this.updateUserData(id);
            return this.data[id];
        }

    }

    async createDataFile(){
        const fileExist = await this.myExistFile('./data');
        if(!fileExist){
            this.fileSystem.mkdirSync('./data');
        }
        await this.myWriteFile('./data/userData.txt', '{}', 'utf8');
    }   

    async loadData(){
        const fileExist = await this.myExistFile('./data/userData.txt');
        if(!fileExist){
            await this.createDataFile();
        }
        this.data = JSON.parse((await this.myReadFile('./data/userData.txt')).toString());
    }

    async isMember(id, pw, option) {
        await this.loadData();
        if(option){
            if(id in this.data){
                return false;
            }
            return true;
        }
        if(id in this.data){
            if(this.data[id].pw === pw){
                return this.data[id];
            }
        }
        return false
    }

    async readUserData(id, pw) {
        return await this.isMember(id, pw);
    } 

    async writeData(){
        await this.myWriteFile('./data/userData.txt', JSON.stringify(this.data));
    }

    async updateUserData(id) {
        const tempInfo = this.data[id];
        await this.loadData();
        this.data[id] = tempInfo;
        await this.writeData();
    }

    async saveData(id,data){
        this.data[id].data = data;
        await this.updateUserData(id);
    }


    myReadFile(path){
        return new Promise(resolve => {
            this.fileSystem.readFile(path, (err,data) =>{
                resolve(data);
            });
        });
    }

    myWriteFile(path, userData, option){
        return new Promise(resolve => {
            this.fileSystem.writeFile(path, userData, option, (err,data)=>{
                resolve();
            });
        })
    }

    myExistFile(path){
        return new Promise((resolve, reject) => {
            this.fileSystem.stat(path, (err, stats) => {
                resolve(stats);
            });
        });
    }
}

class User{
    constructor(id,pw){
        this.id = id;
        this.pw = pw;
        this.data = [['todo'],['doing'],['done']]; 
    }
}