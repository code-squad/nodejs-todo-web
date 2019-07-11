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
        let fileDataString = this.readTodoData()
        let fileDataObj = fileDataString !== "" ? JSON.parse(fileDataString) : {};
        if(fileDataObj[email] === undefined){
            fileDataObj[email] = inputDataArr;
        }else{
            fileDataObj[email].forEach((listData, i)=>{
                let addListData = inputDataArr[i]
                if(JSON.stringify(listData) !== JSON.stringify(addListData)){
                    let newArr = listData.concat(addListData)
                    fileDataObj[email].splice(i, 1, newArr)
                }
            })
        }
        //["todo",[],"doing",["asdasdad"],"done",[]]
        
        let NewFileDataString = JSON.stringify(fileDataObj)
        fs.writeFileSync(this.todoDataURL, NewFileDataString, "utf8") 
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

    readTodoData(){
        return fs.readFileSync(this.todoDataURL, 'utf8');
    }

}

module.exports = ControlData;