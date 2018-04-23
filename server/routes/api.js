const router = require('express').Router()
    ,airController = require("../controller/airController.js")

router.get('/', (req, res) => {
    res.json("this is index page")
})

/**
 * 저장된  전체리스트 api
 */
router.get('/api/getList', (req, res, next) => {
    airController.getList()
    .then(r => res.json(r))
    .catch(next)
})

/**
 * 주요 시,도별 대기정보 API
 * @param city : 도시 이름 
 */
router.get('/api/getSidoData/:sidoName', (req, res, next) => {
    airController.getSidoData(req.params.sidoName)
        .then(r => res.json(r))
        .catch(next)
})

/**
 * 주요 도시별 대기정보 API
 */
router.get('/api/getCityData/:sidoName/:city', (req, res, next) => {
    airController.getCityData(req.params.sidoName, req.params.city)
    .then(r => res.json(r))
    .catch(next)
})

module.exports = router