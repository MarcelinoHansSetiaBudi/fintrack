const express = require("express");
const router = express.Router();

const { index, show, insert, update } = require("../Controllers/transactionController");

router.route('/index').get(index);
router.route('/show/:id').get(show);
router.route('/create').post(insert);
router.route('/update/:id').put(update);

module.exports = router;