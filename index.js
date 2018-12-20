require('dotenv').config()
const express = require('express')
    , bodyParser = require('body-parser')
    , helmet = require('helmet')
    , routes = express.Router()
    , app = express()

app.use(helmet())
app.use(bodyParser.json())
app.use('/', require('./routes/base.js'))
app.use('/registration', require('./routes/registration.js'))
app.use('/login', require('./routes/login.js'))

app.listen(process.env.APP_PORT, () => {
    console.log(`Example app listening on port ${process.env.APP_PORT}!`)
})