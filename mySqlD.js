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

