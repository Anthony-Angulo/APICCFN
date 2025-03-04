const express= require("express");
const {
    createInventoryDetail,
    getInventoryDetail,
    getByZone,
    getByZoneMenudeo,
    updateInventoryDetail,
    updateInventoryStock,
    topUsers,
    getAllInv,
    getZones
} = require("../controllers/inventoryDetail");

const router = express.Router();

router
    .route("/")
    .post(createInventoryDetail)
    .put(updateInventoryDetail);

    router.route("/topUser/:inventoryID").get(topUsers);  

router.route("/:id").get(getInventoryDetail);
router.route("/:id/:zone").get(getByZone);
router.route("/menudeo/:id/:zone").get(getByZoneMenudeo);
router.route("/updatestock").put(updateInventoryStock);
router.route("/all").post(getAllInv);
router.route("/zones/:product/:id").get(getZones);

module.exports = router;