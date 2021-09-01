const connectionDB = require("../config/db");

const InventoryProducts = function (inventoryProducts) {
  this.name = inventoryProducts.name;
};

InventoryProducts.create = (newProducts, result) => {
  var sql = `INSERT INTO ${process.env.DB}.InventoryProducts (ItemCode, ItemName, Quantity, InvQuantity, NeedBatch, WeightType, UserId, InventoryID) VALUES ?`;
  var values = newProducts;

  connectionDB.query(sql, [values], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

InventoryProducts.findBydId = (inventoryId, result) => {
  connectionDB.query(
    `SELECT * FROM ${process.env.DB}.InventoryProducts WHERE InventoryID=${inventoryId}`,
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

InventoryProducts.findByItemCode = (inventoryId, ItemCode, result) => {
  connectionDB.query(
    `SELECT * FROM ${process.env.DB}.InventoryProducts WHERE InventoryID=${inventoryId} AND ItemCode='${ItemCode}'`,
    (err, res) => {

      if (err) {
        result(err, null);
        return;
      }

      if (res) {
        result(null, res);
        return;
      }
      // result({ kind: "not_found" }, null);
    }
  );
};

InventoryProducts.findID = (id, result) => {
  console.log()
  connectionDB.query(
    `SELECT * FROM ${process.env.DB}.InventoryProducts WHERE ID=${id}`,
    (err, res) => {

      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }
      // result({ kind: "not_found" }, null);
    }
  );
};

InventoryProducts.updateInventoryProduct = (
  inventoryProductId,
  ItemCode,
  Quantity,
  result
) => {
  console.log(`UPDATE ${process.env.DB}.InventoryProducts SET Quantity=${Quantity} WHERE ID=${inventoryProductId} AND ItemCode='${ItemCode}'`);
  connectionDB.query(
    `UPDATE ${process.env.DB}.InventoryProducts SET Quantity=${Quantity} WHERE ID=${inventoryProductId} AND ItemCode='${ItemCode}'`,
    (err, res) => {
      if(err) {
        console.log("error: " , err);
        result(null, err);
        return;
    }

    result(null, res);
    }
  );
};

InventoryProducts.topMaxScanned = (InventoryId, result) => {
  connectionDB.query(
    `SELECT Quantity, ItemCode FROM ${process.env.DB}.InventoryProducts WHERE InventoryID=${InventoryId} ORDER BY Quantity DESC LIMIT 10`, (err, res) => {
      if(err) {
        console.log("error: " , err);
        result(null, err);
        return;
    }

    result(null, res);
    }
  );
};

module.exports = InventoryProducts;
