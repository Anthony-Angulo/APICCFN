const asyncHandler = require("../middleware/async");
const ProductLocations = require("../models/ProductLocations");

exports.createProductLocation = asyncHandler(async (req, res, next) => {
    const productLocation = new ProductLocations({
        tarimaid: req.body.tarimaid,
        producto: req.body.producto,
        cantidad: req.body.cantidad,
        unidaddeMedida: req.body.unidaddeMedida,
        fechacaducidad: req.body.fechacaducidad
    });

    ProductLocations.addProduct(productLocation, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
});


exports.getTarima = asyncHandler(async (req, res, next) => {
    ProductLocations.findById(req.params.idtarima, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Tarima con el ID ${req.params.idtarima} No Encontado`,
              });
            } else {
              res.status(500).send({
                message: `Error Al Buscar Tarima con el codigo ${req.params.idtarima}`,
              });
            }
          } else {
            res.status(200).send(data);
          }
    });
});

exports.remove = asyncHandler(async(req, res, next) => {
    ProductLocations.removeProduct(req.params.idTarima, req.params.producto, (err, data) => {
        if (err) {
            res.status(500).send({
              message: err.message,
            });
          } else {
            res.status(200).send(data);
          }
    });
});

exports.updateP = asyncHandler(async(req, res, next) => {
  ProductLocations.updateProduct(req.body.id, req.body.cantidad, req.body.um, req.body.fecha, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send(data);
    }
  })
})

