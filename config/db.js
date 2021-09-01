const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "db2.ccfnweb.com.mx",
    user: "remote",
    password: "Ch1v@s.2019@CCFN.2X5B8M",
    port: 3306,
    multipleStatements: true,
});

 connection.connect(function(err) {
        if(err) {
            console.log('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id: ' + connection.threadId);
});



module.exports = connection;