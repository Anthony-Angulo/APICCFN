const express= require("express");

const {
    createReplica,
    getEntradaDoc,
    getTransferDoc
} = require('../controllers/replica');


const router = express.Router();


router
    .route("/")
    .post(createReplica);

router
    .route("/Entrada/:Docnum")
    .get(getEntradaDoc);

router
    .route("/Transfer/:Doc")
    .get(getTransferDoc);

module.exports = router;