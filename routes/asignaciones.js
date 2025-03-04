const express= require("express");
const {
    createAsignacion,
    getAsignaciones,
    getAsignacion,
    setStatusId
} = require("../controllers/asginaciones");

const router = express.Router();

router
    .route("/")
    .post(createAsignacion)
    .get(getAsignaciones)
    .put(setStatusId);
router
    .route("/:userId")
    .get(getAsignacion);
    
module.exports = router;
