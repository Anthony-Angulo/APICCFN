const connectionDB = require("../config/db");

const CrBar = function (crBar) {
    (this.ItemCode = crBar.ItemCode),
      (this.Peso = crBar.Peso),
      (this.CodeBar = crBar.CodeBar),
      (this.FechaCaducidad = crBar.FechaCaducidad),
      (this.FechaProduccion = crBar.FechaProduccion);
  };

CrBar.create = (newCrBar, result) => {

    var sql = `INSERT INTO ${process.env.DB}.Crbars (ItemCode, Peso, CodeBar, FechaCaducidad, FechaProduccion) VALUES ? `;
    var values = newCrBar;

    connectionDB.query(sql, [values], (err, res) => {
          if (err) {
            result(null, err);
            return;
          }
          result(null, res);
        }
      );
}

CrBar.getAll = result => {
    connectionDB.query(
        `SELECT * FROM ${process.env.DB}.Crbars`, (err, res) => {
            if(err) {
                console.log("error: " , err);
                result(null, err);
                return;
            }
    
            result(null, res);
        }
    );
};

CrBar.getAllNonActive = (ItemCode, result) => {
    connectionDB.query(
        `SELECT * FROM ${process.env.DB}.Crbars WHERE Active = 1 AND ItemCode='${ItemCode}'`, (err, res) => {
            if(err) {
                console.log("error: " , err);
                result(null, err);
                return;
            }
    
            result(null, res);
        }
    );
};

CrBar.findByItemCode = (ItemCode, result) => {
    connectionDB.query(
        `SELECT * FROM ${process.env.DB}.Crbars WHERE ItemCode='${ItemCode}'`, (err, res) => {
            if(err) {
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

CrBar.updateCrStatus = (body, result) => {
    var queries = '';

    body.forEach(x => {
      queries += `UPDATE ${process.env.DB}.Crbars SET Active = ${x.Active} WHERE CodeBar = '${x.CodeBar}'; `;
    });

    connectionDB.query(queries, (err, res) => {
        if(err) {
          result(null, err);
          return;
        }
        result(null, res);
      });
}

module.exports = CrBar;