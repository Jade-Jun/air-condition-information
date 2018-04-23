const fsReadController = require('./fsReadController.js')

const Air = {
    getList : function() {
        return new Promise(async (resolve, reject) => {
            let data = fsReadController.getList()
            if (data) {
                resolve(data)
            } else {
                let error = new Error()
                    error.message = `저장된 데이터가 존재하지 않습니다.`
                    error.status = 500
                console.log('error : ' + error)
                reject(error)
            }
        })
    },

    getSidoData : function(sidoName) {
        return new Promise(async (resolve, reject) => {
            let data = fsReadController.getSidoData(sidoName)
            if (data) {
                resolve(data)
            } else {
                let error = new Error()
                    error.message = `검색되는 데이터가 존재하지 않습니다.`
                    error.status = 500
                console.log('error : ' + error)
                reject(error)
            }
        })
    },

    getCityData : function (sidoName, city) {
        return new Promise(async (resolve, reject) => {
            let data = fsReadController.getCityData(sidoName, city)
            if (data.length > 0) {
                console.log('get local data')
                resolve({data})
            } else {
                let error = new Error()
                error.message = `local data not found`
                error.status = 500
                reject(error)
            }
        })
    },
}

module.exports = Air