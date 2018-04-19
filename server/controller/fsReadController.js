const fs = require('fs')
    , path = require('path')

const FsManager = {
    readFile : function(filePath) {
        let exists = fs.existsSync(filePath) 
        if (exists) {
            let data = fs.readFileSync(filePath)
            let json = JSON.parse(data)
            return json
        } else {
            return null
        }
    },

    exists : function(filePath) {
        return fs.existsSync(filePath) 
    }
}

const dataManager = {
    /**
     * 전체 리스트
     */
    getList : function() {        
        return null
    },

    /**
     * 시도별 데이터 획득
     * @param sidoName: 서울/부산...
     */
    getSidoData : function(sidoName) {
        return null
    },

    /**
     * 시도 주요 도시별 데이터 획득
     * @param sidoName: 서울/부산...
     * @param cityName: 강남구, 관악구...
     */
    getCityData : function(sidoName, cityName) {
        return null
    }
}

module.exports = dataManager