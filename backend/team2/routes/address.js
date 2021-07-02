var express = require("express");
var app = express();
var router = express.Router();
const Address = require("../model/address");

const {
  fetchAllAddresses,
  addAddresses,
  deleteCartItemById,
  delAddresses,
  patchAddress,
} = require("../controllers/address");

const advancedFind = require("../middleware/advancedFind");

router
  .route("/")
  .get(advancedFind(Address), fetchAllAddresses)
  .post(addAddresses);

router.delete("/:id", delAddresses);
router.patch("/:id", patchAddress);

module.exports = router;
