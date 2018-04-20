const cron = require('node-cron')
    ,remoteDataController = require('./controller/remoteDataController.js')
    ,localDataController = require('./controller/localDataController.js')
    ,path = require('path')
    ,utils = require('../utils/utils.js')

/**
 * 파일 병합 cron
 */
cron.schedule('*/1 * * * *', function () {

    const dataPath = path.join(__dirname, '../data/' + utils.nowTime())

    if (localDataController.existsDir(dataPath)) {
        console.log('merge cron start')

        let sidoNames = remoteDataController.getSidonames()
        let fileCount = localDataController.getCount(dataPath)

        if (sidoNames.length != fileCount) {
            console.log('file count is no match')
        } else {
            // 파일 병합
            console.log('file count is match')
        }

    } else {
        console.log('merge cron done')
    }

}).start

module.exports = cron

