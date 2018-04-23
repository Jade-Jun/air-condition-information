const fs = require('../../utils/fsManager.js')
    , path = require('path')
    , utils = require('../../utils/utils.js')

const dataManager = {
    /**
     * 전체 리스트
     */
    getList : function() {        
        let obj = fs.readFile(path.join(__dirname, '../../data/') + utils.nowDay() + ".json")
        return obj
    },

    /**
     * 시도별 데이터 획득
     * @param sidoName: 서울/부산...
     */
    getSidoData : function(sidoName) {
        let obj = fs.readFile(path.join(__dirname, '../../data/') + utils.nowDay() + ".json")
        const data = new Array()
        for (let i = 0; i < obj.data.length; i++) {
            let item = obj.data[i]

            if (sidoName == item.sidoName) {
                console.log('search item : ' + item.sidoName)
                return item.list
            }
        }
        return null
    },

    /**
     * 시도 주요 도시별 데이터 획득
     * @param sidoName: 서울/부산...
     * @param cityName: 강남구, 관악구...
     */
    getCityData : function(sidoName, cityName) {
        let sidoItem = this.getSidoData(sidoName)
        const data = new Array()

        if (sidoItem) {
            for (let i = 0; i < sidoItem.length; i++) {
                let item = sidoItem[i]
                if (cityName == item.cityName) {
                    console.log('search childitem : ' + item.cityName)
                    data.push(item)
                    break
                }
            }
        } 
        return data
    }
}

module.exports = dataManager