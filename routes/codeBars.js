const express= require("express");
const {
    createCodeBar,
    getAllCodeBars,
    getCodearById,
    updateCodeBar,
    getCodeBar
} = require("../controllers/codeBars");

const router = express.Router();

router
    .route("/")
    .post(createCodeBar)
    .get(getAllCodeBars)
    .put(updateCodeBar);

router
    .route("/:itemcode")
    .get(getCodeBar);

router
    .route("/find/:id")
    .get(getCodearById)



module.exports = router;
