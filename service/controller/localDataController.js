const fs = require('fs')

let d = new Date()
,curr_date = d.getDate()
,curr_month = d.getMonth() + 1  //Months are zero based
,curr_year = d.getFullYear()
,curr_hour = d.getHours()
const folderName = curr_year + "-" + curr_month + "-" + curr_date + "_" + curr_hour

const FsManager = {
    exists : function(filePath) {
        return fs.existsSync(filePath) 
    },

    writeFile : function(filePath, data) {
        let streamFile = fs.createWriteStream(filePath, options)

        if (streamFile) {
            streamFile.end(data)
        } else {
            console.log('file open fail!!!')
        }
        return true
    },
}

const DataManager = {
    createModel : function(item) {
        let timestamp = new Date(item.dataTime)
        let schema =  Object.create (model)
        schema.cityName = item.cityName,
        schema.dataTime = timestamp,
        schema.so2Value = item.so2Value,
        schema.coValue = item.coValue,
        schema.o3Value = item.o3Value,
        schema.no2Value = item.no2Value,
        schema.pm10Value = item.pm10Value,
        schema.pm25Value = item.pm25Value
        return schema
    },

    parsingData : function(items) {
        console.log('parsing start')

        let recentTime = items[0].dataTime
        console.log("recent time" + recentTime)

        let data = save
        data.sidoName = items[0].sidoName
        for (let i = 0; i < items.length; i++) {
            let item = items[i]
            if (recentTime == item.dataTime) {
               let schema =  this.createModel(item)
               data.list.push(schema)
            }
        }
        let obj = {
            data : []
        }
        obj.data.push(data)

        let exists = fileManager.exists(filePath)
        console.log(exists ? "it's exists!" : "no exists!")
        return fileManager.saveFile(exists, obj, filePath)
    },

    saveData : function(item) {
        console.log('local save data start')
        let data = this.parsingData(item.list)
    }
}

module.exports = DataManager