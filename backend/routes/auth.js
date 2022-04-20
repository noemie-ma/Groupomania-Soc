const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/control.auth");

// Page de connexion/inscription
router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);

module.exports = router;
