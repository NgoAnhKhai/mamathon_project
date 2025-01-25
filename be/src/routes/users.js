var express = require("express");
const getInforUser = require("../controllers/User/getUserInfor");
const getUserInfoVSchema = require("../controllers/src/user/getUserInfoVSchema");
const validationMiddleware = require("../middlewares/validation.middleware");
const updateUser = require("../controllers/User/updateUser");
var router = express.Router();

/* GET users listing. */
router.get("/:walletAddress", validationMiddleware(getUserInfoVSchema, "params"),getInforUser);
router.put("/wallet/:walletAddress", updateUser);
module.exports = router;
