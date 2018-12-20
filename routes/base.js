const express = require('express')
    , router = express.Router()

/**
* root path
*/
router.get('/', (req, res) => {
    return res.sendStatus(404)
})

/**
* healthcheck
*/
router.get('/status', (req, res) => {
    return res.send('OK')
})

module.exports = router