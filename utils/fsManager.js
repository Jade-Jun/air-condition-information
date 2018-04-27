const fs = require('fs')


/**
 * File Access Object
 */
const FsManager = {
    /**
     * 해당 경로에 파일이 존재하는지 유무 반환
     * @param filePath: 파일 경로
     */
    exists : function(filePath) {
        return fs.existsSync(filePath) 
    },

    /**
     * 해당 경로에 디렉토리가 존재하는지 유무 반환
     * @param dirPath: 디렉토리 경로
     */
    existsDir : function(dirPath) {
        return fs.existsSync(dirPath) ? true : false
    },

    /**
     * 해당 경로에 디렉토리 생성
     * @param dirPath: 디렉토리 경로
     */
    createDir : function(dirPath) {
        if (!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath);
        }
    },

    /**
     * 해당 디렉토리의 하위의 파일 갯수를 반환
     * @param dirPath: 디렉토리 경로
     */
    count : function(dirPath) {
        const files = fs.readdirSync(dirPath)
        return files.length
    },

    /**
     * 해당 경로의 파일을 읽어 데이터를 반환 (json 형태)
     * @param filePath: 파일 경로
     */
    readFile : function(filePath) {
        let exists = fs.existsSync(filePath) 
        if (exists) {
            let object = fs.readFileSync(filePath)
            let json = JSON.parse(object)
            return json
        } else {
            return null
        }
    },

    /**
     * 해당 경로에 파일을 작성 
     * @param filePath: 파일 경로
     * @param object: 저장할 데이터 
     */
    writeFile : function(filePath, object) {
        console.log('write file : ' + filePath)
        let options = { encoding: 'utf8'}
        let streamFile = fs.createWriteStream(filePath, options)

        if (streamFile) {
            let json = JSON.stringify(object);
            streamFile.end(json)
        } else {
            console.log('file open fail!!!')
        }
        return true
    },

    /**
     * 해당 경로의 파일을 삭제
     * @param filePath : 파일 경로
     */
    deleteFile : function(filePath) {
        if (this.exists(filePath)) {
            fs.unlinkSync(filePath) 
        }
    }
}

module.exports = FsManager