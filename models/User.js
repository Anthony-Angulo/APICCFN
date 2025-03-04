const connectionDB = require("../config/db");

const User = function(user) {
    this.UserName = user.UserName
}

User.getAll = result => {
    connectionDB.query(`SELECT Id, Name, LastName, Email FROM ${process.env.DB}.Users`, (err, res) => {
        if(err) {
            console.log("error: " , err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};
       
User.getAllIp = result => {
    connectionDB.query(`SELECT * FROM ${process.env.DB}.RetailServers`, (err, res) => {
        if(err) {
            console.log("error: " , err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};
module.exports = User;