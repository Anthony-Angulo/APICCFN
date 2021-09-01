const express= require("express");
const {
    createInvoice,
    getInvoice,
    getInvoiceByDocNum,
    findCard
} = require("../controllers/Invoice");

const router = express.Router();

router
    .route("/")
    .post(createInvoice);

router
    .route("/:codeBar")
    .get(getInvoice);

router
    .route("/docnum/:docnum")
    .get(getInvoiceByDocNum);

router
    .route("/card/:cardnum")
    .get(findCard);

module.exports = router;