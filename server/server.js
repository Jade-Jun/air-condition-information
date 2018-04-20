const express = require('express')
    ,bodyParser = require('body-parser')
    ,port = process.env.PORT
    ,app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

if (process.env.WITH_SCHEDULE) {
    // pid 파일이 존재하는지 확인 (npid)
    // if (exists)
    const cron = require('../service/cron.js')
}

app.use('/', require('./routes/api.js'))

app.listen(port, function() {
    console.log("go! go!!")
})
