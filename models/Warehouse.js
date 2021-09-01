const connectionDB = require("../config/db");

const Warehouse = function (warehouse) {
  (this.WhsCode = warehouse.WhsCode),
    (this.WhsName = warehouse.WhsName),
    (this.Active = warehouse.Active),
    (this.ActiveCRM = warehouse.ActiveCRM);
};

Warehouse.create = (newWarehouse, result) => {
  connectionDB.query(
    `INSERT INTO ${process.env.DB}.Warehouses SET ?`,
    newWarehouse,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newWarehouse });
    }
  );
};

Warehouse.getAll = (result) => {
  connectionDB.query(
    `SELECT WhsCode, WhsName, ID FROM ${process.env.DB}.Warehouses`,
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

module.exports = Warehouse;
