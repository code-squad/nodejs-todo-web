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

    makeTodoData(email, inputDataArray){
        let fileDataString = this.readTodoData()
        let fileDataObj = fileDataString !== "" ? JSON.parse(fileDataString) : {};
        let userDataArray = fileDataObj[email]
        if(!userDataArray){
            userDataArray = inputDataArray;
        }else{
            userDataArray.forEach((listData, i)=>{
                let addListData = inputDataArray[i]
                if(JSON.stringify(listData) !== JSON.stringify(addListData)){
                    let newDataArray = listData.concat(addListData)
                    userDataArray.splice(i, 1, newDataArray)
                }
            })
        }
        //["todo",[],"doing",["asdasdad"],"done",[]]
        
        let NewFileDataString = JSON.stringify(fileDataObj)
        fs.writeFileSync(this.todoDataURL, NewFileDataString, "utf8") 
    }

    deleteData(email, deleteInfoString){
        let fileDataObj = JSON.parse(this.readTodoData())
        let userDataArray = fileDataObj[email] 
        let [todoUlId, deleteIndex] = JSON.parse(deleteInfoString)

        if (todoUlId === "dataTarget_todo"){
            let todoArray = userDataArray[1]
            todoArray.splice(deleteIndex, 1)
        }else if (todoUlId === "dataTarget_doing"){
            let doingArray = userDataArray[3]
            doingArray.splice(deleteIndex, 1)
        }else if (todoUlId === "dataTarget_done"){
            let doneArray = userDataArray[5]
            doneArray.splice(deleteIndex, 1)
        }
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