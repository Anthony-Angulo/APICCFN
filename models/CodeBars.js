const connectionDB = require("../config/db");

const CodeBars = function (codeBar) {
  (this.ItemCode = codeBar.ItemCode),
    (this.OriginLocation = codeBar.OriginLocation),
    (this.UoM = codeBar.UoM),
    (this.BarcodeLength = codeBar.BarcodeLength),
    (this.WeightLength = codeBar.WeightLength),
    (this.WeightPosition = codeBar.WeightPosition),
    (this.HasDecimal = codeBar.HasDecimal),
    (this.GTinLength = codeBar.GTinLength),
    (this.GTinPosition = codeBar.GTinPosition),
    (this.GTIN = codeBar.GTIN);
};

CodeBars.create = (newCodeBar, result) => {
  connectionDB.query(
    `INSERT INTO ${process.env.DB}.CodeBarDetails SET ?`,
    newCodeBar,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newCodeBar });
    }
  );
};

CodeBars.getAll = result => {
    connectionDB.query(
        `SELECT * FROM ${process.env.DB}.CodeBarDetails`, (err, res) => {
            if(err) {
                console.log("error: " , err);
                result(null, err);
                return;
            }
    
            result(null, res);
        }
    );
};

CodeBars.findByItemCode = (ItemCode, result) => {
    connectionDB.query(
        `SELECT * FROM ${process.env.DB}.CodeBarDetails WHERE ItemCode='${ItemCode}'`, (err, res) => {
            if(err) {
                result(err, null);
                return;
            }
    
            // if(res) {
                result(null, res);
                return;
            // }
    
            // result({ kind: "not_found"}, null);
        }
    );
};

CodeBars.findById = (CodeBarId, result) => {
  connectionDB.query(
      `SELECT * FROM ${process.env.DB}.CodeBarDetails WHERE ID=${CodeBarId}`, (err, res) => {
        if(err) {
          result(err, null);
          return;
      }

      if(res) {
          result(null, res[0]);
          return;
      }

      result({ kind: "not_found"}, null);
      }
  )
};

CodeBars.updateById = (id, codeBar, result) => {
  connectionDB.query(
    `UPDATE ${process.env.DB}.CodeBarDetails SET ? WHERE ID=${id}`, codeBar, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...codeBar });
    }
  );
};

CodeBars.findGTIN = (itemcode, result) => {
  connectionDB.query(
    `SELECT * FROM ${process.env.DB}.ccfn_gs1_128 WHERE U_ItemCode='${itemcode}'`, (err, res) => {
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
  )
};

module.exports = CodeBars;