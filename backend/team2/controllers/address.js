const Address = require("../model/address");
const asyncHandler = require("../middleware/async");

const fetchAllAddresses = asyncHandler(async (req, res, next) => {
  res.json(res.advancedResults);
});

const addAddresses = asyncHandler(async (req, res, next) => {
  let addressRes = await Address.create(req.body);
  console.log(addressRes);
  res.status(201).json({ success: true });
});

const delAddresses = asyncHandler(async (req, res, next) => {
  Address.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(201).json({
        message: "address deleted",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

const patchAddress = asyncHandler(async (req, res, next) => {
  Address.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then((result) => {
      res.status(201).json({
        message: "address updated",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = {
  fetchAllAddresses,
  addAddresses,
  delAddresses,
  patchAddress,
};
