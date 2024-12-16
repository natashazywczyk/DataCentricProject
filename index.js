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
//Get student in url to match with sid in database
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

app.get("/students/add", (req, res) => {
    res.render("add");
})

// POST for updates
app.post("/students/edit/:sid", (req, res) => {
    const studentId = req.params.sid;
    const { name, age } = req.body;

    //Make sure all fields are valid
    //Check name
    if (!name || name.length < 2) {
        res.status(400).send("Invalid name, must be 2 characters long");
    }
    //Make sure all fields are valid
    //Check age
    if (age < 18) {
        res.status(400).send("Invalid age, student must be at least 18");
    }

    // Update the student in the database
    mySqlD.updateStudent(studentId, name, age)
        .then(() => {
            res.redirect("/students");//Go back to student page
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error updating student.");
        });
});

//POST for new added student
app.post("/students/add", (req, res) => {
    const { name, age } = req.body;

    //Make sure all fields are valid
    //Check name
    if (!name || name.length < 2) {
        res.status(400).send("Invalid name, must be 2 characters long");
    }
    //Make sure all fields are valid
    //Check age
    if (age < 18) {
        res.status(400).send("Invalid age, student must be at least 18");
    }

    // Add the student to the database
    mySqlD.addStudent(name, age)
        .then(() => {
            res.redirect("/students"); //Go back to student page after
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error adding student.");
        });
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