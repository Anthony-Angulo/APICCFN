const express= require("express");
const {
    createInventoryProduct,
    getInventoryProduct,
    getByIdAndItemCode,
    updateInventoryProduct,
    topMaxValScanned,
    getInventoryProductID
} = require("../controllers/inventoryProducts");

const router = express.Router();

router
    .route("/")
    .post(createInventoryProduct)
    .put(updateInventoryProduct);
    
router.route("/find/:id").get(getInventoryProductID);

router.route("/:id").get(getInventoryProduct);

router.route("/top/:InventoryId").get(topMaxValScanned);

router.route("/:id/:itemcode").get(getByIdAndItemCode);



module.exports = router;
