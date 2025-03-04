const express= require("express");

const  {
    createProductLocation,
    getTarima,
    remove,
    updateP
} = require("../controllers/productLocations");

const router = express.Router();

router
    .route("/")
    .post(createProductLocation)

router
    .route("/:idtarima")
    .get(getTarima);


router
    .route("/remove/:idTarima/:producto")
    .put(remove);

router
    .route("/")
    .put(updateP)


module.exports = router;