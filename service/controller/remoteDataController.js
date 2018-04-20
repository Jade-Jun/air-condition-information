const request = require('request')

const Remote = {
    getSidonames : function () {
        return new Array('서울', '부산')

        // return new Array('서울', '부산', '대구', '인천', '광주', '대전', '울산', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '세종')
    },

    remoteUrl : function (sidoName) {
        let url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureSidoLIst'
        , queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + process.env.SERVER_KEY /* Service Key*/
                queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('40') /* 한 페이지 결과 수 */
                queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1') /* 페이지 번호 */
                queryParams += '&' + encodeURIComponent('sidoName') + '=' + encodeURIComponent(sidoName)  /* 시도 이름 (서울, 부산, 대구, 인천, 광주, 대전, 울산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종) */
                queryParams += '&' + encodeURIComponent('searchCondition') + '=' + encodeURIComponent('DAILY') /* 요청 데이터기간 (시간 : HOUR, 하루 : DAILY) */
                queryParams += '&_returnType=json'
        console.log(url + queryParams)
        return url + queryParams
    },

    getData : function(sidoName)  {
        return new Promise(async (resolve, reject) => {
            request({
                url: this.remoteUrl(sidoName),
                method: 'GET'
            }, function (error, response, body) {
                console.log('Status', response.statusCode)
                // console.log('Headers', JSON.stringify(response.headers))

                let data = JSON.parse(body)
                if (data) {
                    console.log('response result')
                    resolve(data)
                }
                else {
                    console.log('response error : ', error)
                    reject(error)
                }
                // console.log('Reponse received', data)
                
            })
        })
    }
}

module.exports = Remote