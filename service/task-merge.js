const cron = require('node-cron')
    ,remoteDataController = require('./controller/remoteDataController.js')
    ,localDataController = require('./controller/localDataController.js')
    ,path = require('path')
    ,utils = require('../utils/utils.js')

/**
 * 해당 크론은 다운받은 파일을 병합하여 하나의 json파일로 만드는 cron이다.
 * 동작 주기는 아래 시간(분)을 기준으로 동작한다.
 */
cron.schedule('*/30 * * * *', function () {

    const dataPath = path.join(__dirname, '../data/' + utils.nowTime())
    const  mergePath = path.join(__dirname, '../data/') + utils.nowDay() + ".json"

    // 해당 시간에 매칭되는 merge 된 json 파일 존재하는지 확인
    if (localDataController.existsDir(dataPath)) {
        console.log('merge cron start')
        
        let sidoNames = remoteDataController.getSidonames()
        let fileCount = localDataController.getCount(dataPath)

        // 해당 디렉토리 내에 파일갯수와 요청갯수가 같은지 확인 
        if (sidoNames.length != fileCount) {
            console.log('file count is no match')
        } else {

            const schema ={
                time : utils.nowTime(),
                data : []
            }

            // 파일 로드
            console.log('file count is match')
            for (let i = 0; i < sidoNames.length; i++) {
                let sidoName = sidoNames[i]
                let item = localDataController.readFile(dataPath + "/" + sidoName + ".json")
                schema.data.push(item)
            }

            // 병합 파일 생성
            localDataController.saveMerge(mergePath, schema)
        }

    } else {
        console.log('merge cron done')
    }

}).start

module.exports = cron

