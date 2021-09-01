const asyncHandler = require("../middleware/async");
const InventoryProducts = require("../models/InventoryProduct");
const InventoryProduct = require("../models/InventoryProduct");

exports.createInventoryProduct = asyncHandler(async (req, res, next) => {
  InventoryProduct.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send(data);
    }
  });
});

exports.getInventoryProduct = asyncHandler(async (req, res, next) => {
  InventoryProduct.findBydId(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Inventario Con El ID ${req.params.id} No Encontado`,
        });
      } else {
        res.status(500).send({
          message: `Error Al Buscar Inventario Con El ID ${req.params.id}`,
        });
      }
    } else {
      res.status(200).send(data);
    }
  });
});

exports.getInventoryProductID = asyncHandler(async (req, res, next) => {
  InventoryProduct.findID(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Inventario Con El ID ${req.params.id} No Encontado`,
        });
      } else {
        res.status(500).send({
          message: `Error Al Buscar Inventario Con El ID ${req.params.id}`,
        });
      }
    } else {
      res.status(200).send(data);
    }
  });
});

exports.getByIdAndItemCode = asyncHandler(async (req, res, next) => {
  InventoryProduct.findByItemCode(
    req.params.id,
    req.params.itemcode,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Product Con El ID ${req.params.ItemCode} No Encontado`,
          });
        } else {
          res.status(500).send({
            message: `Error al buscar Product Con El ID ${req.params.ItemCode}`,
          });
        }
      } else {
        res.status(200).send(data);
      }
    }
  );
});

exports.updateInventoryProduct = asyncHandler(async (req, res, next) => {
  InventoryProduct.updateInventoryProduct(
    req.body.id,
    req.body.itemcode,
    req.body.quantity,
    (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send(data);
      }
    }
  );
});

exports.topMaxValScanned = asyncHandler(async (req, res, next) => {
  InventoryProducts.topMaxScanned(req.params.InventoryId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send(data);
    }
  });
});
