const express = require('express')
    , router = express.Router()
    , cognito = require('../modules/cognito')

/**
 * Login user
 */
router.post('/', (req, res) => {
    cognito.authenticate(req.body.email, req.body.password)
        .then(result => {
            return res.json(result)
        })
        .catch(error => {
            return res.sendStatus(500)
        })
})

router.post('/token', (req, res) => {
    cognito.validateToken(req.body.token)
    .then(result => {
        return res.json(result)
    })
    .catch(error => {
        return res.sendStatus(500)
    })
})

module.exports = router