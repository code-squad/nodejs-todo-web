const fs = require('fs');
const csv = require('csvtojson')

class ControlData {
    constructor() {
        this.dataURL = './data/client_data.csv';
    }

    makeClientData(inputDataObj){
        const signUpColumn = "nickName,ID,PW,data" + "\n";
        let contents = inputDataObj.nickName + "," + inputDataObj.email + "," + inputDataObj.pwd + "\n";
        if( this.existDataFile() ) {
            fs.appendFileSync(this.dataURL, contents) 
        }else{
            fs.writeFileSync(this.dataURL, signUpColumn + contents, 'utf8');
        }
        
    }

    existDataFile(){
        return fs.existsSync(this.dataURL);
    }

    readClientData(){
        return new Promise((resolve)=>{
            csv().fromFile(this.dataURL).then((jsonObj)=>{
                resolve(jsonObj)
            })
        })
    }

}

module.exports = ControlData;