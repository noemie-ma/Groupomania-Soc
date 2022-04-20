const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const messageCtrl = require("../controllers/control.messages");
const multer = require("../middlewares/multer-config");

router.get("/all", messageCtrl.findAllMessages);
router.post("/create", auth, multer, messageCtrl.createMessage);
router.put("/update", auth, messageCtrl.updateMessage);
router.delete("/:id", auth, messageCtrl.deleteMessage);

module.exports = router;
