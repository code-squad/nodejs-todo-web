const fs = require('fs');
const csv = require('csvtojson')

class ControlData {
    constructor() {
        this.clientDataURL = './data/client_data.csv';
        this.todoDataURL = './data/todo_data.txt';
    }

    makeClientData(inputDataObj){
        let contents = inputDataObj.nickName + "," + inputDataObj.email + "," + inputDataObj.pwd + "\n";
        fs.appendFileSync(this.clientDataURL, contents) 
    }

    makeTodoData(email, inputDataArr){
        let contents = {};
        contents[email] = inputDataArr;

        let fileDataString = fs.readFileSync(this.todoDataURL, 'utf8');
        let fileDataObj = fileDataString !== "" ? JSON.parse(fileDataString) : {};
        fileDataObj[email] = inputDataArr;
        
        let NewFileDataString = JSON.stringify(fileDataObj)
        fs.writeFileSync(this.todoDataURL, NewFileDataString) 
    }

    existDataFile(){
        return fs.existsSync(this.clientDataURL);
    }

    readClientData(){
        return new Promise((resolve)=>{
            csv().fromFile(this.clientDataURL).then((jsonObj)=>{
                resolve(jsonObj)
            })
        })
    }

}

module.exports = ControlData;