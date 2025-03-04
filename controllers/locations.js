const asyncHandler = require("../middleware/async");
const Locations = require("../models/Locations");

exports.createUbicacion = asyncHandler(async (req, res, next) => {
    const location = new Locations({
        ubicacion: req.body.ubicacion
    });

    Locations.create(location, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
});

exports.find = asyncHandler(async(req, res, next) => {
    Locations.findbyId(req.params.ubicacion, req.params.sufijo, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `No encontrada la ubicacion ${req.params.ubicacion}`,
              });
            } else {
              res.status(500).send({
                message: `Error Al Buscar ubicacion ${req.params.ubicacion}`,
              });
            }
          } else {
            res.status(200).send(data);
          }
    });
});

exports.updateU = asyncHandler(async(req, res, next) => {
  Locations.updateLocation(req.body.id, req.body.ubicacion, req.body.sufijo,  (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send(data);
    }
  })
})



