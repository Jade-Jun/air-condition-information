/**
 * 동작할 cron에 대한 명세 파일이다.
 */
const cron = {
    main : require('./task-main.js'),
    merge : require('./task-merge.js')
}

module.exports = cron