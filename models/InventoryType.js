const connectionDB = require("../config/db");

//constructor
const InventoryType = function(inventoryType) {
    this.Label = inventoryType.Label
}

InventoryType.create = (newInventoryType, result) => {
    connectionDB.query(`INSERT INTO ${process.env.DB}.InventoryTypes SET ?`, newInventoryType, (err, res) => {
        if(err) {
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newInventoryType});
    });
};

InventoryType.getAll = result => {
    connectionDB.query(`SELECT * FROM ${process.env.DB}.InventoryTypes`, (err, res) => {
        if(err) {
            result(null, err);
            return;
        } else {
            result(null, res);
        }
    });
};

module.exports = InventoryType;