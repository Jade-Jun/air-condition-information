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
    const  mergePath = path.join(__dirname, '../data/') + utils.nowTime() + ".json"

    // 해당 시간에 매칭되는 merge 된 json 파일 존재하는지 확인
    if (!localDataController.exists(mergePath)) {
        console.log('merge cron start')

        // donwload 완료됨 json파일이 존재하는지 확인
        if (!localDataController.existsDir(dataPath)) {
            return
        }
        
        let sidoNames = remoteDataController.getSidonames()
        let fileCount = localDataController.getCount(dataPath)

        // 해당 디렉토리 내에 파일갯수와 요청갯수가 같은지 확인 
        if (sidoNames.length != fileCount) {
            console.log('file count is no match')
        } else {

            const data = new Array()

            // 파일 로드
            console.log('file count is match')
            for (let i = 0; i < sidoNames.length; i++) {
                let sidoName = sidoNames[i]
                let path = localDataController.readFile(dataPath + "/" + sidoName + ".json")
                data.push(path)
            }
            console.log("merge data array : " +  data)

            // 병합 파일 생성
            localDataController.saveMerge(mergePath, data)
        }

    } else {
        console.log('merge cron done')
    }

}).start

module.exports = cron

