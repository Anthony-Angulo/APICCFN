const connectionDB = require("../config/db");

const Asginacion = function (asignacion) {
    (this.UserId = asignacion.UserId),
        (this.UserName = asignacion.UserName),
        (this.StatusId = asignacion.StatusId),
        (this.Status = asignacion.Status),
        (this.FechaDeRuta = asignacion.FechaDeRuta),
        (this.Nombre = asignacion.Nombre)
};

Asginacion.create = (newAsignacion, result) => {
    connectionDB.query(`INSERT INTO ${process.env.DB}.InvoiceHeader SET ?`, newAsignacion, (err, res) => {
        if(err) {
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newAsignacion});
    });
};

Asginacion.getAll = result => {
    connectionDB.query(
        `SELECT * FROM ${process.env.DB}.InvoiceHeader as i INNER JOIN  ${process.env.DB}.Statuses as s ON i.StatusId = s.ID`, (err, res) => {
            if(err) {
                console.log("error: " , err);
                result(null, err);
                return;
            }
    
            result(null, res);
        }
    );
};

Asginacion.getByUser = (userId, result) => {
    connectionDB.query(
        `SELECT * FROM ${process.env.DB}.InvoiceHeader as i INNER JOIN ${process.env.DB}.Statuses as s
        ON i.StatusId = s.ID WHERE i.UserId = ${userId} AND i.StatusId != 3 AND DATE(i.FechaDeRuta) = CURDATE()`, (err, res) => {
            if(err) {
                console.log(err)
                result(err, null);
                return;
            }
    
            if(res) {
                result(null, res);
                return;
            }
    
            result({ kind: "not_found"}, null);
        }
    );
};

Asginacion.setStatus = (statusId, id, result) => {
    connectionDB.query(
        `UPDATE ${process.env.DB}.InvoiceHeader SET StatusId=${statusId} WHERE id=${id}`, (err, res) => {
            if (err) {
                result(err, null);
                return;
              }
              result(null, { id: res.insertId });
        }
    );
}

module.exports = Asginacion;