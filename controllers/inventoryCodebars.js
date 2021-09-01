const asyncHandler = require("../middleware/async");
const InventoryCodebars = require("../models/InventoryCodebars");

exports.createInventoryCodebar = asyncHandler(async(req, res, next) => {
    InventoryCodebars.create(req.body, (err, data) => {
        if (err) {
            res.status(500).send({
              message: err.message,
            });
          } else {
            res.status(200).send(data);
          }
    });
});

exports.getInventoryCodebar = asyncHandler(async(req, res, next) => {
    InventoryCodebars.findById(req.params.id, (err, data) => {
        if(err) {
          if(err.kind === "not_found") {
              res.status(404).send({
                  message: `Inventario Con El ID ${req.params.id} No Encontado`
              });
          } else {
              res.status(500).send({
                  message: `Error Al Buscar Inventario Con El ID ${req.params.id}`
              });
          }
      } else {
          res.status(200).send(data);
      }
      });
});

exports.getInventoryCodeBarByCodeBar = asyncHandler(async(req, res, next) => {
    InventoryCodebars.findByCodeBar(req.body.codebar, req.body.inventoryID, (err, data) => {
        if (err) {
            res.status(500).send({
              message: err.message,
            });
          } else {
            res.status(200).send(data);
          }
    });
});

exports.deleteInventoryCodeBar = asyncHandler(async(req, res, next) => {
    InventoryCodebars.deleteById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
              message: err.message,
            });
          } else {
            res.status(200).send(data);
          }
    });
});