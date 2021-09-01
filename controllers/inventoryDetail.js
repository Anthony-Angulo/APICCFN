const asyncHandler = require("../middleware/async");
const InventoryDetail = require("../models/InventoryDetail");

exports.createInventoryDetail = asyncHandler(async(req, res, next) => {
    const inventoryDetail = new InventoryDetail({
        Quantity: req.body.quantity,
        Zone: req.body.zone,
        UserId: req.body.userId,
        InventoryProductID: req.body.inventoryProductId
    });

    InventoryDetail.create(inventoryDetail, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
});

exports.getInventoryDetail = asyncHandler(async (req, res, next) => {
    InventoryDetail.findById(req.params.id, (err, data) => {
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

exports.updateInventoryDetail = asyncHandler(async(req, res, next) => {
    InventoryDetail.updateById(req.body.id, req.body.quantity, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        } 
    });
});

exports.updateInventoryStock = asyncHandler(async(req, res, next) => {
    InventoryDetail.updateQty(req.body, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        } 
    });
});

exports.getAllInv = asyncHandler(async(req, res, next) => {
    InventoryDetail.getAll(req.body, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        } 
    });
});

exports.getByZone = asyncHandler(async(req, res, next) => {
    InventoryDetail.findByZone(req.params.id, req.params.zone, (err, data) => {
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
    })
});

exports.topUsers = asyncHandler(async(req, res, next) => {
    InventoryDetail.topUserScanned(req.params.inventoryID, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }  
    });
});