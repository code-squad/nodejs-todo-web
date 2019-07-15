const ControlData = require('./control_data');
const Show = require('./view/template');
const data = new ControlData();
const show = new Show();

class Login {
  show(view){
    if(view === "signup"){
      let signup = show.signupTemplate("")
      return show.HTML(signup)
    }
    if(view === "signupError"){
      let signUpError = show.signUpError()
      let signup = show.signupTemplate(signUpError)
      return show.HTML(signup)
    }
    if(view === "login"){
      let login = show.loginTemplate("")
      return show.HTML(login)
    }
    if(view === "loginError"){
      let loginError = show.loginError()
      let login = show.loginTemplate(loginError)
      return show.HTML(login)
    }
  }

  async signUp(inputDataObj){
    let clientArray = await data.readClientData();
    let alreadyExist = clientArray.some((infoObj)=>{return infoObj.email === inputDataObj.email})
    if(!data.existDataFile() || !alreadyExist){
      data.makeClientData(inputDataObj)
      return true
    }else{
      return false
    }
  }

  async checkLogin(inputDataObj){
    let clientArray = await data.readClientData();
    let alreadyExist = clientArray.some((infoObj)=>{return infoObj.email === inputDataObj.email && infoObj.pwd === inputDataObj.pwd})

    if(alreadyExist){
      return true;
    }else{
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