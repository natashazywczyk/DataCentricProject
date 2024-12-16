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
var getStudentById = (id) => {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: "SELECT * FROM student WHERE sid = id",
            values: [id]
        }
        pool.query(myQuery, (error, result) => {
            if (error) {
                return reject(error);
            }
            if (result.length > 0) {
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

//Function to create new Promise where data is read in for Grades for students for each module
var getGrades = function() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM grade')
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

//Allows other files to use function
module.exports = { getStudent, getGrades, getStudentById }