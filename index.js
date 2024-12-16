var express = require('express')
let ejs = require('ejs') //download for ui
var mySqlD = require('./mySqlD') //allows access to MySQL database read

var app = express() //creates express application

app.set('view engine', 'ejs') //adds ejs to project

//Set localhost port number
app.listen(3004, () => {
    console.log('Running on port 3004')
})
