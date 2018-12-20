const express = require('express')
    , router = express.Router()
    , cognito = require('../modules/cognito')

/**
 * register user
 */
router.post('/', (req, res) => {
    cognito.registerUser(req.body.email, req.body.password)
        .then(result => {
            return res.json(result)
        })
        .catch(error => {
            return res.json(error)
        })
})

/**
 * Confirm user registration
 */
router.post('/confirm', (req, res) => {
    cognito.confirmRegistration(req.body.email, req.body.code)
        .then(result => {
            return res.sendStatus(200)
        })
        .catch(error => {
            return res.sendStatus(404)
        })
})

module.exports = router