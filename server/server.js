const express = require('express')
    ,bodyParser = require('body-parser')
    ,port = process.env.PORT || 3000
    ,app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/', require('./routes/api.js'))

app.listen(port, function() {
    console.log("go! go!!")
})
