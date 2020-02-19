const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const server = express()

server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))
server.use(routes)

nunjucks.configure("src/views", {
    express: server,
    noCache: true,
    autoescape: false
})

server.listen(3000, function() {
    console.log('server is running')
})