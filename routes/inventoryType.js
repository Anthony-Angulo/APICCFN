const express = require("express");
const {
    createInventoryType,
    getAllInventoryType
} = require("../controllers/inventoryType");


const router = express.Router();

router 
    .route("/")
    .post(createInventoryType)
    .get(getAllInventoryType);

module.exports = router;