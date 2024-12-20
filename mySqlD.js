var pmysql = require('promise-mysql') //download promise-mysql
var pool

//Create Pool, connect MySQL database
pmysql.createPool({
    connectionLimit : 3,
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'proj2024mysql'
})
.then((p) => {
    pool = p
})
.catch((e) => {
    console.log("pool error: " + e)
})

//Function to get a student by id
var getStudentById = (sid) => {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: "SELECT * FROM student WHERE sid = sid",
            values: [sid]
        }
        pool.query(myQuery, (error, result) => {
            if (error) {
                console.log(error)
                reject(error);
            }
            if (result.length > 0) {
                console.log(result[0])
                resolve(result[0]);
            }
        });
    })
}

//Function to create new Promise where data is read in for Students 
var getStudent = function() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM student')
        .then((data) => {
            console.log(data)
            resolve(data)
        })
        .catch((error) => {
            console.log(error)
            reject(error)
        })          
    })
}

//Function ot edit student details
var updateStudent = (studentId, newName, newAge) => {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: "UPDATE student SET name = newName, age = newAge WHERE sid = studentId",
            values: [newName, newAge, studentId]  //values of name, age, and sid
        };
        pool.query(myQuery, (error, result) => {
            if (error) {
                return reject(error);
            }
            if (result.affectedRows > 0) {
                resolve("Update successful");
            } else {
                reject("No student with that ID was found");
            }
        });
    });
}

//Function to add student to database
var addStudent = (sid, name, age) => {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: "INSERT INTO student (sid, name, age) VALUES (sid, name, age)",
            values: [sid, name, age]
        };

        pool.query(myQuery, (error, result) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            // Resolve when the student is successfully added
            resolve(result);
        });
    });
};

//Function to create new Promise where data is read in for Grades for students for each module
var getGrades = function() {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: "SELECT student.name AS StudentName, module.name AS ModuleName, grade.grade AS Grade FROM grade INNER JOIN student ON grade.sid = student.sid INNER JOIN module ON grade.mid = module.mid ORDER BY student.name ASC, grade.grade ASC"
        };

        pool.query(myQuery, (error, result) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            resolve(result);
        });
    })
}

//Allows other files to use function
module.exports = { getStudent, getGrades, getStudentById, updateStudent, addStudent }