const asyncHandler = require("../middleware/async");
const CodeBars = require("../models/CodeBars");

exports.createCodeBar = asyncHandler(async (req, res, next) => {
  const codebar = new CodeBars({
    ItemCode: req.body.ItemCode,
    OriginLocation: req.body.OriginLocation,
    UoM: req.body.UoM,
    BarcodeLength: req.body.BarcodeLength,
    WeightLength: req.body.WeightLength,
    WeightPosition: req.body.WeightPosition,
    HasDecimal: req.body.HasDecimal,
    GTinLength: req.body.GTinLength,
    GTinPosition: req.body.GTinPosition,
    GTIN: req.body.GTIN,
  });

  CodeBars.create(codebar, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send(data);
    }
  });
});

exports.getAllCodeBars = asyncHandler(async (req, res, next) => {
  CodeBars.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send(data);
    }
  });
});

exports.getCodeBar = asyncHandler(async (req, res, next) => {
  CodeBars.findByItemCode(req.params.itemcode, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Codigo de barra Con El codigo ${req.params.itemcode} No Encontado`,
        });
      } else {
        res.status(500).send({
          message: `Error Al Buscar Codigo de barra Con El codig ${req.params.itemcode}`,
        });
      }
    } else {
      res.status(200).send(data);
    }
  });
});

exports.getCodearById = asyncHandler(async (req, res, next) => {
  CodeBars.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Codigo de barra Con El codigo ${req.params.itemcode} No Encontado`,
        });
      } else {
        res.status(500).send({
          message: `Error Al Buscar Codigo de barra Con El codig ${req.params.itemcode}`,
        });
      }
    } else {
      res.status(200).send(data);
    }
  });
});

exports.updateCodeBar = asyncHandler(async (req, res, next) => {
  const codebar = new CodeBars({
    ItemCode: req.body.ItemCode,
    OriginLocation: req.body.OriginLocation,
    UoM: req.body.UoM,
    BarcodeLength: req.body.BarcodeLength,
    WeightLength: req.body.WeightLength,
    WeightPosition: req.body.WeightPosition,
    HasDecimal: req.body.HasDecimal,
    GTinLength: req.body.GTinLength,
    GTinPosition: req.body.GTinPosition,
    GTIN: req.body.GTIN,
  });

  CodeBars.updateById(req.body.ID, codebar, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send(data);
    }
  });
});
