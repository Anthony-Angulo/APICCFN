const mysql = require("mysql");

// var connection = mysql.createConnection({
//     host: "db2.ccfnweb.com.mx",
//     user: "remote",
//     password: "Ch1v@s.2019@CCFN.2X5B8M",
//     port: 3306,
//     multipleStatements: true,
// });

var connection  = mysql.createPool({
    connectionLimit : 10,
    host: "db2.ccfnweb.com.mx",
    user: 'apiwms',
    password: '%^t@G#T6uY-bf!R4',
    database: 'CCFNDEV',
    multipleStatements: true,
    port: 3306
});

 connection.getConnection(function(err) {
        if(err) {
            console.log('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id: ' + connection.threadId);
});



module.exports = connection;