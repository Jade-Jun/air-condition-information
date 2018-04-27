const express = require('express')
    ,bodyParser = require('body-parser')
    ,port = process.env.PORT
    ,app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// cron 별도의 instance로 돌리기 위한 환경변수
if (process.env.WITH_SCHEDULE) {
    // pid 파일이 존재하는지 확인 (npid)
    // if (exists)
    const cron = require('../service/cron.js')
}

app.use('/', require('./routes/api.js'))

console.log("port use : " + port)
app.listen(port, function() {
    console.log("go! go!!")
})
