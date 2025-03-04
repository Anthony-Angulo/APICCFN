const asyncHandler = require("../middleware/async");
const crBars = require("../models/Crbars");

exports.createCrBar = asyncHandler(async (req, res, next) => {


    crBars.create(req.body, (err, data) => {
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
    crBars.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message,
            });
        } else {
            res.status(200).send(data);
        }
    });
});

exports.getAllCodeBarsNonActive = asyncHandler(async (req, res, next) => {
    crBars.getAllNonActive(req.params.itemcode, (err, data) => {
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
    crBars.findByItemCode(req.params.itemcode, (err, data) => {
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

exports.updateCrBar = asyncHandler(async (req, res, next) => {
    crBars.updateCrStatus(req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message,
            });
        } else {
            res.status(200).send(data);
        }
    });
});