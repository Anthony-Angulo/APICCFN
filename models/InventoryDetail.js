const connectionDB = require("../config/db");

const InventoryDetail = function (inventoryDetail) {
  (this.Quantity = inventoryDetail.Quantity),
    (this.Zone = inventoryDetail.Zone),
    (this.UserId = inventoryDetail.UserId),
    (this.CodeBar = inventoryDetail.CodeBar),
    (this.UomCode = inventoryDetail.UomCode),
    (this.InventoryProductID = inventoryDetail.InventoryProductID);
};

InventoryDetail.create = (newInventoryDetail, result) => {
  connectionDB.query(
    `INSERT INTO ${process.env.DB}.InventoryProductDetails SET ?`,
    newInventoryDetail,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newInventoryDetail });
    }
  );
};

InventoryDetail.findById = (inventoryProductId, result) => {
  connectionDB.query(
    `SELECT i.ID, i.Quantity, i.CodeBar, i.UomCode, i.Zone, i.DateCreated, i.InventoryProductID, u.UserName FROM ${process.env.DB}.InventoryProductDetails as i
    JOIN ${process.env.DB}.Users AS u
      ON i.Userid = u.Id 
    WHERE InventoryProductID=${inventoryProductId} AND i.Quantity != 0`,
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

InventoryDetail.updateById = (inventoryDetailId, Quantity, result) => {
  connectionDB.query(
    `UPDATE ${process.env.DB}.InventoryProductDetails SET Quantity=${Quantity}
    WHERE ID=${inventoryDetailId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      result(null, res);
    }
  );
};

InventoryDetail.updateQty = (body, result) => {
  var queries = '';

  body.forEach(x => {
    queries += `UPDATE ${process.env.DB}.InventoryProducts SET InvQuantity = ${x.Qty} WHERE ID = ${x.id}; `;
  });


  connectionDB.query(queries, (err, res) => {
      if(err) {
        result(null, err);
        return;
      }
      result(null, res);
    });
    
};

InventoryDetail.getAll = (body, result) => {
  var queries = '';

  body.forEach(x => {
    queries += `SELECT COUNT(*) AS cajas, (SELECT ItemCode FROM ${process.env.DB}.InventoryProducts WHERE ID = ${x}) AS ItemCode FROM ${process.env.DB}.InventoryProductBatches WHERE InventoryProductDetailID IN (SELECT ID FROM ${process.env.DB}.InventoryProductDetails WHERE InventoryProductID IN (SELECT ID FROM ${process.env.DB}.InventoryProducts WHERE ID = ${x})); `
  });

  console.log(queries)

  

  connectionDB.query(queries, (err, res) => {
    if(err) {
      result(null, err);
      return;
    }
    result(null, res);
  });

}

InventoryDetail.findByZone = (inventoryID, Zone, result) => {
  connectionDB.query(
    `SELECT p.ID, p.ItemCode, p.ItemName, p.InvQuantity, p.NeedBatch, p.WeightType,i.Quantity, i.Zone, u.UserName FROM ${process.env.DB}.InventoryProductDetails AS i
    JOIN ${process.env.DB}.InventoryProducts AS p ON i.InventoryProductID = p.ID
    JOIN ${process.env.DB}.Users AS u ON i.UserId = u.Id
    WHERE p.InventoryID=${inventoryID} AND i.Zone='${Zone}'`,
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

InventoryDetail.findZones = (product, id, result) => {
  connectionDB.query(
    `SELECT p.ID, p.ItemCode, p.InventoryID, p.ItemName, i.Quantity, i.Zone FROM ${process.env.DB}.InventoryProductDetails AS i
    JOIN ${process.env.DB}.InventoryProducts AS p ON i.InventoryProductID = p.ID
    WHERE p.ItemCode='${product}' AND p.InventoryID=${id}`,
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

InventoryDetail.findByZoneMenudeo = (inventoryID, Zone, result) => {
  connectionDB.query(
    `SELECT p.ID, p.ItemCode, p.ItemName, i.Quantity, i.Zone, i.ID as contador, u.UserName  FROM ${process.env.DB}.InventoryProductDetails AS i
    JOIN ${process.env.DB}.InventoryProducts AS p ON i.InventoryProductID = p.ID 
    JOIN ${process.env.DB}.Users AS u ON i.UserId = u.Id
    WHERE p.InventoryID=${inventoryID} AND i.Zone='${Zone}' ORDER BY contador ASC`,
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

InventoryDetail.topUserScanned = (inventoryID, result) => {
  connectionDB.query(
    `SELECT 
    SUM(d.Quantity) as Quantity,  u.UserName
    FROM
      ${process.env.DB}.InventoryProductDetails AS d
        JOIN
        ${process.env.DB}.Users AS u ON u.Id = d.UserId
        JOIN
        ${process.env.DB}.InventoryProducts AS p ON p.ID = d.InventoryProductID
  WHERE
    p.InventoryID = ${inventoryID}
  GROUP BY u.UserName
  ORDER BY SUM(d.Quantity) DESC LIMIT 10`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      result(null, res);
    }
  );
};

module.exports = InventoryDetail;
