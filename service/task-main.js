const cron = require('node-cron')
    ,localDataController = require('./controller/localDataController.js')
    ,remoteDataController = require('./controller/remoteDataController.js')
    ,path = require('path')
    ,utils = require('../utils/utils.js')

/**
 * file merge
 */
cron.schedule('*/1 * * * *', function () {
    
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