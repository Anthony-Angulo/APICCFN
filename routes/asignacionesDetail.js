const express= require("express");
const {
    createInvoiceDetail,
    getInvoiceDetail,
    getInvoiceDetailApp,
    updateInvoiceDetails,
    updateCambio,
    getTipoCambio,
    getInvoiceDetailPrint
} = require("../controllers/asignacionesDetail");

const router = express.Router();

router
    .route("/")
    .post(createInvoiceDetail);


router.route("/:id").get(getInvoiceDetail);
router.route("/app/:id").get(getInvoiceDetailApp);
router.route("/print/:id").get(getInvoiceDetailPrint);
router.route("/cambio").put(updateCambio);
router.route("/tipoCambio/obtener").get(getTipoCambio);
router.route("/updateInvoiceDetail").put(updateInvoiceDetails);

module.exports = router;