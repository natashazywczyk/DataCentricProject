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

//Function to delete student by id
var deleteStudent = (id) => {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: "DELETE FROM student_table WHERE student_id = id",
            values: [id]
        }
        pool.query(myQuery, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results); 
        });
    })
}

//Allows other files to use function
module.exports = { getStudent, getGrades, deleteStudent }