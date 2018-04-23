const fs = require('fs')

const FsManager = {
    exists : function(filePath) {
        return fs.existsSync(filePath) 
    },

    existsDir : function(dir) {
        return fs.existsSync(dir) ? true : false
    },

    createDir : function(dir) {
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
    },

    count : function(dir) {
        const files = fs.readdirSync(dir)
        return files.length
    },

    readFile : function(filePath) {
        let exists = fs.existsSync(filePath) 
        if (exists) {
            let data = fs.readFileSync(filePath)
            let json = JSON.parse(data)
            return json
        } else {
            return null
        }
    },

    writeFile : function(filePath, data) {
        console.log('write file : ' + filePath)
        let options = { encoding: 'utf8'}
        let streamFile = fs.createWriteStream(filePath, options)

        if (streamFile) {
            let json = JSON.stringify(data);
            streamFile.end(json)
        } else {
            console.log('file open fail!!!')
        }
        return true
    },

    writeArrayFile : function(filePath, data) {
        console.log('write file : ' + filePath)
        let options = { encoding: 'utf8'}
        let streamFile = fs.createWriteStream(filePath, options)

        if (streamFile) {
            let json = JSON.stringify(data);
            
            streamFile.end(JSON.stringify({data}))
        } else {
            console.log('file open fail!!!')
        }
    }
}

module.exports = FsManager