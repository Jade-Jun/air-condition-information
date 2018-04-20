
const utils = {
    nowTime : function() {
        let d = new Date()
        ,curr_date = d.getDate()
        ,curr_month = d.getMonth() + 1  //Months are zero based
        ,curr_year = d.getFullYear()
        ,curr_hour = d.getHours()
        const now = curr_year + "-" + curr_month + "-" + curr_date + "_" + curr_hour
        return now
    }
}

module.exports = utils