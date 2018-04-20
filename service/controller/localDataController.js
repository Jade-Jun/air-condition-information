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

        let filePath = dir + '/' + data.sidoName + '.json'
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

    meregeFile : function() {
        
    }
}

module.exports = DataManager
