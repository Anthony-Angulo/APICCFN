const express= require("express");
const {
    createInventoryDetail,
    getInventoryDetail,
    getByZone,
    updateInventoryDetail,
    updateInventoryStock,
    topUsers,
    getAllInv,
} = require("../controllers/inventoryDetail");

const router = express.Router();

router
    .route("/")
    .post(createInventoryDetail)
    .put(updateInventoryDetail);

    router.route("/topUser/:inventoryID").get(topUsers); 

router.route("/:id").get(getInventoryDetail);
router.route("/:id/:zone").get(getByZone);
router.route("/updatestock").put(updateInventoryStock);
router.route("/all").post(getAllInv);

module.exports = router;