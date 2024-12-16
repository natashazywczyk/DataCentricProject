var express = require('express')
let ejs = require('ejs') //download for ui
var mySqlD = require('./mySqlD') //allows access to MySQL database read

var app = express() //creates express application

app.set('view engine', 'ejs') //adds ejs to project

//Set localhost port number
app.listen(3004, () => {
    console.log('Running on port 3004')
})

//HomePage
//Make sure student id appears at top of page, with menu to navigate to 3 different menus
app.get("/", (req, res) => {
    res.render("mainpage")
})
