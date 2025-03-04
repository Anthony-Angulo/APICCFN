const connectionDB = require("../config/db");


const Replica = function (replica) {
    (this.DocNum = replica.DocNum),
      (this.Entrada = replica.Entrada),
      (this.Transfer = replica.Transfer);
  };


  Replica.create = (newReplica, result) => {
    connectionDB.query(
      `INSERT INTO ${process.env.DB}.validateReplica SET ?`,
      newReplica,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, { id: res.insertId, ...newReplica });
      }
    );
  };

  Replica.getEntrada = (value, result) => {
    connectionDB.query(
      `SELECT * FROM ${process.env.DB}.validateReplica WHERE Docnum=${value} AND Entrada = 1`,
      (err, res) => {
        if (err) {
          result(null, err);
          return;
        } else {
          result(null, res);
        }
      }
    );
  };

  Replica.getTransfer = (value, result) => {
    connectionDB.query(
      `SELECT * FROM ${process.env.DB}.validateReplica WHERE Docnum=${value} AND Transfer = 1`,
      (err, res) => {
        if (err) {
          result(null, err);
          return;
        } else {
          result(null, res);
        }
      }
    );
  };

  module.exports = Replica;