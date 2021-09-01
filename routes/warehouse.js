const express = require("express");
const {
    createWarehouse,
    getAllWarehouse
} = require("../controllers/warehouse");

const router = express.Router();

router
    .route("/")
    .post(createWarehouse)
    .get(getAllWarehouse);

module.exports = router;