const asyncHandler = require("../middleware/async");
const Asginacion = require("../models/Asignaciones");


exports.createAsignacion = asyncHandler(async(req, res, next) => {
    console.log(req.body)
    const asignacion = new Asginacion({
        UserId: req.body.userId,
        UserName: req.body.userName,
        StatusId: req.body.statusId,
        Status: req.body.status,
        FechaDeRuta: req.body.fechaDeRuta,
        Nombre: req.body.nombre
    });

    Asginacion.create(asignacion, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
});

exports.getAsignaciones = asyncHandler(async (req, res, next) => {
    Asginacion.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
});

exports.getAsignacion = asyncHandler(async (req, res, next) => {
    Asginacion.getByUser(req.params.userId, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Productos Con El ID de usuario ${req.params.userid} No Encontado`
                });
            } else {
                res.status(500).send({
                    message:`Productos Con El ID de usuario ${req.params.userid} No Encontado`
                });
            }
        } else {
            res.status(200).send({"data": data});
        }
    });
});

exports.setStatusId = asyncHandler(async (req, res, next) => {
    console.log(req.body)
    Asginacion.setStatus(req.body.statusId,req.body.id, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Productos Con El ID de usuario ${req.params.userid} No Encontado`
                });
            } else {
                res.status(500).send({
                    message:`Productos Con El ID de usuario ${req.params.userid} No Encontado`
                });
            }
        } else {
            res.status(200).send({"data": data});
        }
    })
})