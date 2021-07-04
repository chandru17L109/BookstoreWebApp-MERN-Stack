var express = require("express");
var app = express();
var router = express.Router();
const AddressUser = require("../model/addressUser");

const {
    fetchAllAddressesUser,
    addAddressesUser,
    delAddressesUser,
    patchAddressUser,
} = require("../controllers/addressUser");



router.get("/:email", fetchAllAddressesUser)
router.post("/", addAddressesUser);

router.delete("/", delAddressesUser);
router.patch("/", patchAddressUser);

module.exports = router;