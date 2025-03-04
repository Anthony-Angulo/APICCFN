const express= require("express");

const  {
    createUbicacion,
    find,
    updateU
} = require("../controllers/locations");

const router = express.Router();

router
    .route("/:ubicacion/:sufijo")
    .get(find)

router
    .route("/")
    .post(createUbicacion)
    .put(updateU)

module.exports = router;