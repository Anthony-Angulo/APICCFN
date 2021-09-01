const asyncHandler = require("../middleware/async");
const InventoryType = require("../models/InventoryType");


exports.createInventoryType = asyncHandler(async(req, res, next) => {
    const inventoryType = new InventoryType({
        Label: req.bodu.label
    });

    InventoryType.create(inventoryType, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
});

exports.getAllInventoryType = asyncHandler(async(req, res, next) => {
    InventoryType.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
});