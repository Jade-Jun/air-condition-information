const fs = require('fs')
    , path = require('path')
    , model = require('../model/air.js')
    , local = require('../model/local.js')

const FsManager = {
    exists : function(filePath) {
        return fs.existsSync(filePath) 
    },

    createDir : function(dir) {
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
    },

    writeFile : function(filePath, data) {
        console.log('write file : ' + filePath)
        let options = { encoding: 'utf8'}
        let streamFile = fs.createWriteStream(filePath, options)

        if (streamFile) {
            let json = JSON.stringify(data);
            streamFile.end(json)
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

    parsingData : function(dirPath, items) {
        console.log('parsing start')

        let recentTime = items[0].dataTime
        console.log("recent time" + recentTime)

        let data = local
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

        let filePath = dirPath + '/' + data.sidoName + '.json'
        return FsManager.writeFile(filePath, obj)
    },

    saveData : function(dirPath, item) {
        console.log('local save data start')
        let data = this.parsingData(dirPath, item.list)
    },

    existsDir : function(dirPath) {
        return fs.existsSync(dirPath) ? true : false
    },

    createDir : function(dirPath) {
        FsManager.createDir(dirPath )
    },

    meregeFile : function() {

    }
}

module.exports = DataManager
