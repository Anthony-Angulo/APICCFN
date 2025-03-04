const express= require("express");
const {
    getAllUser,
    getAllServer
} = require("../controllers/user");

const router = express.Router();

router
    .route("/")
    .get(getAllUser);
router
    .route("/ip")
    .get(getAllServer);

module.exports = router;
