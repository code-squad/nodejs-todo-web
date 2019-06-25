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
            this.data.id = tempInfo;
            this.updateUserData(id);
            return this.data.id
        }

    }

    createDataFile(){
        if(!this.fileSystem.existSync('./data')){
            this.fileSystem.mkdir('./data');
        }
        this.fileSystem.writeFileSync('./data/userData.csv', '{}', 'utf8');
    }   

    loadData(){
        if(!this.fileSystem.existSync('./data/userData.csv')){
            this.createDataFile();
        }
        this.data = JSON.parse(this.fileSystem.readFIleSync('./data/userData.csv').toString());
    }

    isMember(id, pw) {
        this.loadData();
        if(id in this.data){
            this.data.id.pw === pw;
            return this.data.id;
        }
        return false
    }

    readUserData(id, pw) {
        return this.isMember(id, pw);
    }

    writeData(){
        this.fileSystem.writeFileSync('./data/userData.csv', JSON.stringify(this.userdata));
    }

    updateUserData(id) {
        const tempInfo = this.data[id];
        this.loadData();
        this.data.id = tempInfo
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