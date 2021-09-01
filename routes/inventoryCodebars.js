const express= require("express");
const {
    createInventoryCodebar,
    getInventoryCodebar,
    getInventoryCodeBarByCodeBar,
    deleteInventoryCodeBar
} = require("../controllers/inventoryCodebars");

const router = express.Router();

router
    .route("/")
    .post(createInventoryCodebar);

router.route("/:id").get(getInventoryCodebar);
router.route("/delete/:id").delete(deleteInventoryCodeBar);
router.route("/validatebatch").post(getInventoryCodeBarByCodeBar);


module.exports = router;