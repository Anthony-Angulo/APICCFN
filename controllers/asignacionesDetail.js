const asyncHandler = require("../middleware/async");
const AsginacionDetail = require("../models/AsignacionesDetail");

exports.createInvoiceDetail = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  AsginacionDetail.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send(data);
    }
  });
});

exports.getInvoiceDetail = asyncHandler(async (req, res, next) => {
  console.log('controller 1')
  AsginacionDetail.findBydId(req.params.id, (err, data) => {
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
      res.status(200).send({ "data": data });
    }
  });
});

exports.getInvoiceDetailPrint = asyncHandler(async (req, res, next) => {
  AsginacionDetail.findByidPrint(req.params.id, (err, data) => {
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
      res.status(200).send({ "data": data });
    }
  });
});

exports.getInvoiceDetailApp = asyncHandler(async (req, res, next) => {
  console.log('controller 2')
  AsginacionDetail.findBydIdApp(req.params.id, (err, data) => {
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
      res.status(200).send({ "data": data });
    }
  });
});

exports.getTipoCambio = asyncHandler(async (req, res, next) => {
  console.log('controller 3')
  AsginacionDetail.findCambio((err, data) => {
    if(err) {
      res.status(500).send({
          message: err.message
      });
  } else {
      res.status(200).send(data);
  }
  });
});

exports.updateInvoiceDetails = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  AsginacionDetail.updateInvoiceDetail(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message
      });
    } else {
      res.status(200).send(data);
    }
  });
});

exports.updateCambio = asyncHandler(async (req, res, next) => {
  AsginacionDetail.createCambio(req.body.cambio, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message
      });
    } else {
      res.status(200).send(data);
    }
  });
});