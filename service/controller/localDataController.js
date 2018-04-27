const fs = require('../../utils/fsManager.js')
    , path = require('path')
    , model = require('../model/air.js')
    , local = require('../model/local.js')

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

    parsingData : function(dir, items) {
        console.log('parsing start')

        let recentTime = items[0].dataTime
        console.log("recent time" + recentTime)

        let obj = local
        obj.sidoName = items[0].sidoName
        for (let i = 0; i < items.length; i++) {
            let item = items[i]
            if (recentTime == item.dataTime) {
               let schema =  this.createModel(item)
               obj.list.push(schema)
            }
        }

        let filePath = dir + '/' + obj.sidoName + '.json'
        return fs.writeFile(filePath, obj)
    },

    saveData : function(dir, item) {
        console.log('local save data start')
        let data = this.parsingData(dir, item.list)
    },

    existsDir : function(dir) {
        return fs.existsDir(dir)
    },

    createDir : function(dir) {
        fs.createDir(dir )
    },

    getCount : function(dir) {
        return  fs.count(dir)
    },

    readFile : function(filePath) {
        console.log("read file path : " + filePath)
        let obj  = local
        obj = fs.readFile(filePath)
        return obj
    },

    saveMerge : function(filePath, data) {
        console.log("merge file create path : " + filePath)
        fs.deleteFile(filePath)
        fs.writeFile(filePath, data)
    }
}

module.exports = DataManager
