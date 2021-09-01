const connectionDB = require("../config/db");
const Inventory = require("./Inventory");

const InventoryCodebars = function (inventoryCodeBars) {
  this.id = inventoryCodeBars.id;
};

InventoryCodebars.create = (newInventoryCodebars, result) => {

  if(newInventoryCodebars.length == 0) {
    result(null, "no cb");
    return;
  }

  var sql = `INSERT INTO ${process.env.DB}.InventoryProductBatches (Quantity, Batch, CodeBar, InventoryProductDetailID) VALUES ?`;
  var values = newInventoryCodebars;

  connectionDB.query(sql, [values], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

InventoryCodebars.findById = (inventoryProductDetailID, result) => {
  connectionDB.query(
    `SELECT * FROM ${process.env.DB}.InventoryProductBatches WHERE InventoryProductDetailID=${inventoryProductDetailID}`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

InventoryCodebars.findByCodeBar = (codeBar, inventoryID, result) => {
  connectionDB.query(
    `SELECT * FROM ${process.env.DB}.InventoryProductBatches AS b
    JOIN ${process.env.DB}.InventoryProductDetails AS d
      ON d.ID = b.InventoryProductDetailID
    JOIN ${process.env.DB}.InventoryProducts AS p
      ON p.ID = d.InventoryProductID
    JOIN ${process.env.DB}.Inventories AS i
      ON i.ID = p.InventoryID
    WHERE i.ID = ${inventoryID} AND CodeBar='${codeBar}'`, (err, res) => {
      if(err) {
        result(err, null);
        return;
      }

      // if(res) {
      //   result(null, res);
      //   return;
      // }

      result(null, res);
    }
  );
};

InventoryCodebars.deleteById =(inventoryCodeBarid, result) => {
  connectionDB.query(
    `DELETE FROM ${process.env.DB}.InventoryProductBatches WHERE ID=${inventoryCodeBarid}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      result(null, res);
    }
  )
}
module.exports = InventoryCodebars;
