const express = require("express");
const {
    createCrBar,
    getAllCodeBars,
    getCodeBar,
    updateCrBar,
    getAllCodeBarsNonActive
} = require("../controllers/crBars");

const router = express.Router();

router
    .route("/")
    .post(createCrBar)
    .get(getAllCodeBars);

router
    .route('/nonActive/:itemcode')
    .get(getAllCodeBarsNonActive);

router
    .route("/:itemcode")
    .get(getCodeBar);

router.route('/updateCr').put(updateCrBar);

module.exports = router;