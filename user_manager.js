module.exports = class UserManager {
    constructor(fileSystem) {
        this.fileSystem = fileSystem;
        this.data;
    }

    logIn(id, pw) {
        return this.readUserData(id, pw);
    }

    signUp(id, pw) {
        // data 불러오기
        // id 있는지 확인
        // 있으면 false 반환

        // 없으면 유저 객체 만들기
        // this.data 에 유저 넣기
        // data 업데이트하기
        // 유저 반환하기

        // loadData()
        // if(isMember()){
        //     return false
        // }else{
        //     const tempInfo = new User(id,pw)
        //     this.data.id = tempInfo
        //     updateUserData()
        //     return this.data.id
        // }

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
        // data저장하기

        // write file (data.csv, this.userdata);
    }

    updateUserData(id) {
        // 현재 id정보 따로 저장하기
        // data 불러오기
        // data에 현재 정보 넣기
        // 데이터 쓰기

        // const tempInfo = this.data.id
        // loadData()
        // this.data.id = tempInfo
        // writeData()

    }
}

class User{
    constructor(id,pw){
        this.id = id;
        this.pw = pw;
        this.data = {};
    }
}