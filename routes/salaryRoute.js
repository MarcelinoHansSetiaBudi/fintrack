const express = require("express");
const router = express.Router();

const { index, show, insert, update, destroy } = require("../Controllers/transactionController");

router.route("/index").get(index);
router.route("/show/:id").get(show);
router.route("/insert").post(insert);
router.route("/update/:id").put(update);
router.route("/delete/:id").delete(destroy);

module.exports = router;
