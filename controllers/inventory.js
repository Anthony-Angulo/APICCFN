const asyncHandler = require("../middleware/async");
const Inventory = require("../models/Inventory");


exports.createInventory = asyncHandler(async(req, res, next) => {
    const inventory = new Inventory({
        TypeID: req.body.type,
        StatusID: req.body.status,
        WarehouseID: req.body.warehouse,
        UserID: req.body.userid,
        WhsType: req.body.whsType
    });

    Inventory.create(inventory, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
});

exports.getAllInventory = asyncHandler(async (req, res, next) => {
    Inventory.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
});

exports.getFullActive = asyncHandler(async (req, res, next) => {
    Inventory.getFullActive((err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
});

exports.getPartialActive = asyncHandler(async (req, res, next) => {
    Inventory.getPartialActive((err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
});

exports.getProductsByUser = asyncHandler(async(req, res, next) => {
    Inventory.findProductsByUser(req.params.inventoryid, req.params.userid, (err, data) => {
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
            res.status(200).send(data);
        }
    });
});

exports.getInventory = asyncHandler(async (req, res, next) => {
    Inventory.findById(req.params.id, (err, data) => {
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

exports.updateInventoryStatus = asyncHandler(async(req, res, next) => {
    Inventory.updateStatusById(req.body.id, req.body.statusId, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        } 
    });
});