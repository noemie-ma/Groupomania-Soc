const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const likeCtrl = require("../controllers/control.interactions");

router.post("/", auth, likeCtrl.interactions);

module.exports = router;
