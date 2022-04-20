const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const userCtrl = require("../controllers/control.users");

// Profil post conexion/inscription
router.get("/:id", auth, userCtrl.findOneAccount);
router.put("/update/:id", auth, userCtrl.updateThisAccount);
router.delete("/:id", auth, userCtrl.deleteMyAccount);

module.exports = router;
