const express = require("express");
const router = express.Router();

const { index } = require("../Controllers/expanditureController");

router.route('/index').get(index);

module.exports = router;
