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

//Students Page
//Make sure student id appears at top of page, with menu to navigate to 3 different menus
app.get("/students", (req, res) => {
    mySqlD.getStudent()
    .then((data) => {
        console.log(JSON.stringify(data)) //changes json file to string
        res.render("student", {studentsList: data}) //assign value to variables
    })
    .catch((error) => {
        res.send(error)
    })
})

//Update Student Page
app.get("/students/edit/:sid", (req, res) => {
    const studentId = req.params.sid;
    mySqlD.getStudentById(studentId)
        .then((data) => {
            console.log(JSON.stringify(data)) //changes json file to string

            const student = data;
            res.render("edit", { student }); 
        })
        .catch((err) => res.status(500).send(err));
});


//Grades Page
//Make sure student id appears at top of page, with menu to navigate to 3 different menus
app.get("/grades", (req, res) => {
    mySqlD.getGrades()
    .then((data) => {
        console.log(JSON.stringify(data)) //changes json file to string
        res.render("grades", {gradesList: data}) //assign value to variables
    })
    .catch((error) => {
        res.send(error)
    })
})

//Lecturers Page
//Make sure student id appears at top of page, with menu to navigate to 3 different menus
app.get("/lecturers", (req, res) => {
    res.render("lecturers")
})