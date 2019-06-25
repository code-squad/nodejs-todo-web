module.exports = class UserManager {
    constructor(fileSystem) {
        this.fileSystem = fileSystem;
        this.data;
    }

    logIn(id, pw) {
        return this.readUserData(id, pw);
    }

    signUp(id, pw) {
        this.loadData();
        if(this.isMember()){
            return false;
        }else{
            const tempInfo = new User(id,pw);
            this.data[id] = tempInfo;
            this.updateUserData(id);
            return this.data[id];
        }

    }

    createDataFile(){
        if(!this.fileSystem.existsSync('./data')){
            this.fileSystem.mkdirSync('./data');
        }
        this.fileSystem.writeFileSync('./data/userData.txt', '{}', 'utf8');
    }   

    loadData(){
        if(!this.fileSystem.existsSync('./data/userData.txt')){
            this.createDataFile();
        }
        this.data = JSON.parse(this.fileSystem.readFileSync('./data/userData.txt').toString());
    }

    isMember(id, pw) {
        this.loadData();
        if(id in this.data){
            this.data[id].pw === pw;
            return this.data[id];
        }
        return false
    }

    readUserData(id, pw) {
        return this.isMember(id, pw);
    }

    writeData(){
        this.fileSystem.writeFileSync('./data/userData.txt', JSON.stringify(this.data));
    }

    updateUserData(id) {
        const tempInfo = this.data[id];
        this.loadData();
        this.data[id] = tempInfo;
        this.writeData();
    }
}

class User{
    constructor(id,pw){
        this.id = id;
        this.pw = pw;
        this.data = {}; 
    }
}