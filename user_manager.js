module.exports = class UserManager {
    constructor(fileSystem) {
        this.fileSystem = fileSystem;
        this.data;
    }

    logIn(id, pw) {
        userdata 불러오기
        userdata 리턴하기

        return readUserData(id, pw)
    }

    signUp(id, pw) {
        data 불러오기
        id 있는지 확인
        있으면 false 반환

        없으면 유저 객체 만들기
        this.data 에 유저 넣기
        data 업데이트하기
        유저 반환하기

        loadData()
        if(isMember()){
            return false
        }else{
            const tempInfo = new User(id,pw)
            this.data.id = tempInfo
            updateUserData()
            return this.data.id
        }

    }

    createDataFile(){
        data폴더 있는지 확인
        없으면 만들기
        파일 만들기

        if(!folder exist){
            mkdir ./data
        }
        write file (./data/data.csv)
    }   

    loadData(){
        data 파일 있는지 확인하기
        없으면 만들기
        data 불러오기
        data 리턴하기

        if( !fileExist ){
            this.createDataFile()
        }
        this.data = readfile data

    }

    isMember(id, pw) {
        data 로드하기
        id,pw 조회하기
        결과 리턴하기
        
        loadData()
        if(id in this.data){
            this.data.id.pw === pw
            return this.data.id;
        }
        return false
    }

    readUserData(id, pw) {
        id, pw 확인하기
        userdata 리턴하기

        return isMember(id, pw)
    }

    writeData(){
        data저장하기

        write file (data.csv, this.userdata);
    }

    updateUserData(id) {
        현재 id정보 따로 저장하기
        data 불러오기
        data에 현재 정보 넣기
        데이터 쓰기

        const tempInfo = this.data.id
        loadData()
        this.data.id = tempInfo
        writeData()

    }
}

class User{
    constructor(id,pw){
        this.id = id;
        this.pw = pw;
        this.data = {};
    }
}