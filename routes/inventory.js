const express= require("express");
const {
    createInventory,
    getAllInventory,
    getFullActive,
    getInventory,
    updateInventoryStatus,
    getPartialActive,
    getProductsByUser
} = require("../controllers/inventory");

const router = express.Router();

router
    .route("/")
    .post(createInventory)
    .get(getAllInventory)
    .put(updateInventoryStatus);

router
    .route("/fullInventory")
    .get(getFullActive);

router
    .route("/partial")
    .get(getPartialActive);

router
    .route("/:inventoryid/:userid")
    .get(getProductsByUser);
    

router.route("/:id").get(getInventory);



module.exports = router;
