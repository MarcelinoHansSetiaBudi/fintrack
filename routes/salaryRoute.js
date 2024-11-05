const express = require("express");
const router = express.Router();

const { index } = require("../Controllers/transactionController");

router.route('/index').get(index);

module.exports = router;