const cron = require('node-cron')
    ,localDataController = require('./localDataController.js')
    ,path = require('path')

/**
 * file merge
 */
cron.schedule('*/60 * * * *', function () {
    
    let d = new Date()
    ,curr_date = d.getDate()
    ,curr_month = d.getMonth() + 1  //Months are zero based
    ,curr_year = d.getFullYear()
    ,curr_hour = d.getHours()
    const now = curr_year + "-" + curr_month + "-" + curr_date + "_" + curr_hour
    const dataPath = path.join(__dirname, '../data/' + now)

    // 매칭되는 dir이 없을 경우에만 동작함.
    if (!localDataController.existsDir()) {
        console.log('main cron start')
        // dir 생성
        localDataController.createDir(dataPath)
    } else {
        console.log('main cron done')
    }
}).start