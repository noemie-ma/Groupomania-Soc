const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/control.comments");
const auth = require("../middlewares/auth");

router.get("/", commentCtrl.getAllComments);
router.post("create", auth, commentCtrl.createComment);
router.get("/:messageId", commentCtrl.getOneComment);
router.delete("/", auth, commentCtrl.deleteComment);

module.exports = router;
