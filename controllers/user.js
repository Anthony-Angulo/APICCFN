const asyncHandler = require("../middleware/async");
const User = require("../models/User");

exports.getAllUser = asyncHandler(async (req, res, next) => {
    User.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
});