const ControlData = require('./control_data');
const data = new ControlData();

class Session {
    constructor(){
        this.sessionData = {}
    }

    async makeSession(email){
        let id = this.makeSessionID()
        let data = await this.findData(email)
        this.sessionData["ID"] = id;
        this.sessionData[id] = data;
        this.sessionData["HttpOnly"] = "HttpOnly";
        return this.sessionData;
    }

    makeSessionID(){
       return Number(new Date)*123456789
    }

    async findData(email){
        let clientArray = await data.readClientData();
        let selectedData = []
        clientArray.forEach((clientData)=>{clientData.email === email ? selectedData.push(clientData) : false})
        return selectedData;
    }
}

module.exports = Session