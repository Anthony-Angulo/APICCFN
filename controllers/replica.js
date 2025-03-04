const asyncHandler = require("../middleware/async");
const Replica = require("../models/Replica");

exports.createReplica = asyncHandler(async(req, res, next) => {
    const replica = new Replica({
        DocNum: req.body.DocNum,
        Entrada: req.body.Entrada,
        Transfer: req.body.Transfer,
    });

    Replica.create(replica, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
});

exports.getEntradaDoc = asyncHandler(async(req, res, next) => {
    Replica.getEntrada(req.params.Docnum, (err, data) => {
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

exports.getTransferDoc = asyncHandler(async(req, res, next) => {
    Replica.getTransfer(req.params.Doc, (err, data) => {
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