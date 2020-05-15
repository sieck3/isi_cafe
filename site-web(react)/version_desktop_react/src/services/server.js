'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// const dao = require('.').dao

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static('dist'))

const PORT = 8080
/* const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'
const CONTENT_TYPE_HTML = 'text/html' */

app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:%s', PORT)
})
