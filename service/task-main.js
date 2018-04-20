const cron = require('node-cron')
    ,localDataController = require('./controller/localDataController.js')
    ,remoteDataController = require('./controller/remoteDataController.js')
    ,path = require('path')

/**
 * file merge
 */
cron.schedule('*/1 * * * *', function () {
    
    let d = new Date()
    ,curr_date = d.getDate()
    ,curr_month = d.getMonth() + 1  //Months are zero based
    ,curr_year = d.getFullYear()
    ,curr_hour = d.getHours()
    const now = curr_year + "-" + curr_month + "-" + curr_date + "_" + curr_hour
    const dataPath = path.join(__dirname, '../data/' + now)

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