const ControlData = require('./control_data');
const data = new ControlData();

class Login {

  async signUp(inputDataObj){
      // let [name, ID, PW] = inputDataObj;
      let clientData = await data.readClientData();
      let alreadyExist = clientData.some((infoObj)=>{return infoObj.email === inputDataObj.email})
      console.log(alreadyExist)
      if(!data.existDataFile() || !alreadyExist){
        data.makeClientData(inputDataObj)
        console.log("회원가입이 완료되었습니다.")
        return true
      }else{
        console.log("이미 이메일주소가 있는 가입정보입니다")
        return false
      }
    }

  

  async checkLogin(inputDataArray){
    let [ID, PW] = inputDataArray;
    let clientData = await data.readClientData();
    let alreadyExist = clientData.some((infoObj)=>{return infoObj.ID === ID && infoObj.PW === PW})

    if(alreadyExist){
      alert("로그인 되었습니다.") 
      return true
    }else{
      alert("잘못입력하셨습니다.")
      return false
    } 
  }

}
  
// const login = new Login
// login.alreadyExistDataLogin(["ruby413","ruby413"])

module.exports = Login;