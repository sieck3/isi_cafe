'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const session = require('express-session')

const MongoStore = require('connect-mongo')(session)

const MONGO_URL = 'mongodb://127.0.0.1:27017/'
// const dao = require('.').dao

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static('dist'))

app.use(session({
    secret: 'ESTO ES SECRETO',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: MONGO_URL,
        autoReconnect: true
    })
}))

const PORT = 8080
const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'
const CONTENT_TYPE_HTML = 'text/html'

// RECUPERATION SESSION
app.get('/session', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    // request.session.test = request.session.test ? request.session.test + 1 : 1
    response.end(JSON.stringify(request.session.json))
})

// CREATION SESSION
app.post('/startsession', function (request, response) {
    const json = request.body.json
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    request.session.json = json

    response.end('true')
})

app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:%s', PORT)
})
