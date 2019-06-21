const ControlData = require('./control_data');
const data = new ControlData();

class Login {

  async signUp(inputDataObj){
      let clientArray = await data.readClientData();
      let alreadyExist = clientArray.some((infoObj)=>{return infoObj.email === inputDataObj.email})
      if(!data.existDataFile() || !alreadyExist){
        data.makeClientData(inputDataObj)
        console.log("회원가입이 완료되었습니다.")
        return true
      }else{
        console.log("이미 이메일주소가 있는 가입정보입니다")
        return false
      }
    }

  

  async checkLogin(inputDataObj){
    let clientArray = await data.readClientData();
    let alreadyExist = clientArray.some((infoObj)=>{return infoObj.email === inputDataObj.email && infoObj.pwd === inputDataObj.pwd})
    if(alreadyExist){
      console.log("로그인 되었습니다.") 
      return true
    }else{
      console.log("잘못입력하셨습니다.")
      return false
    } 
  }

  async findNickname(email){
    let clientArray = await data.readClientData();
    let nickName = ""
    clientArray.forEach((clientData)=>{clientData.email === email ? nickName = clientData.nickName : false})
    return nickName;
  }

}
module.exports = Login;