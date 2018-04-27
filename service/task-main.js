const cron = require('node-cron')
    ,localDataController = require('./controller/localDataController.js')
    ,remoteDataController = require('./controller/remoteDataController.js')
    ,path = require('path')
    ,utils = require('../utils/utils.js')

/**
 * 해당 cron은 서버로 부터 데이터(공기정보)를 받아 로컬에 파일로 저장하는 cron이다.
 * 동작 주기는 아래 시간(분)을 기준으로 동작한다.
 */
cron.schedule('*/720 * * * *', function () {
    
    const dataPath = path.join(__dirname, '../data/' + utils.nowTime())
    const  mergePath = path.join(__dirname, '../data/') + utils.nowDay() + ".json"

    console.log('cron dir check : ' + dataPath )
    // 매칭되는 dir이 없을 경우에만 동작함.
    if (!localDataController.existsDir(dataPath)) {
        console.log('main cron start')
        // dir 생성
        localDataController.createDir(dataPath)

        let sidoNames = remoteDataController.getSidonames()
        for (let i = 0; i<sidoNames.length; i++) {
            let sidoName = sidoNames[i]
            remoteDataController.getData(sidoName)
            .then(data => localDataController.saveData(dataPath, data))
            .catch(err => console.log(err))
        }
        
    } else {
        console.log('main cron done')
    }
}).start

module.exports = cron