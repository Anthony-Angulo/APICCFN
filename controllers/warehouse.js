const asyncHandler = require("../middleware/async");
const Warehouse = require("../models/Warehouse");

exports.createWarehouse = asyncHandler(async(req, res, next) => {
    const warehouse = new Warehouse({
        WhsCode: req.body.WhsCode,
        WhsName: req.body.WhsName,
        Active: req.body.Active,
        ActiveCRM: req.body.ActiveCRM
    });

    Warehouse.create(warehouse, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
});

exports.getAllWarehouse = asyncHandler(async (req, res, next) => {
    Warehouse.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
});

