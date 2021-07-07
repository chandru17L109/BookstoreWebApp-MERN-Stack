const WishItem = require("../../team4/model/wishlist");
const asyncHandler = require('../middleware/async');

const fetchAllWishItems = asyncHandler(async (req, res, next) => {
    console.log(req.params.id);
    try {
        const wishItems = await WishItem.findOne({ _id: req.params.id }).select('books');
        console.log(wishItems);
        if (!wishItems) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(201).json({
            success: true,
            data: wishItems
        });
    } catch (err) {
        next(err);
    }
})

const addWishItems = asyncHandler(async (req, res, next) => {
    let searchData = await WishItem.find({ email: req.params.email });
    if (searchData.length === 0) {
        let postNewbook = await WishItem.create({ email: req.params.email, books: [req.body.bookid] });
        console.log(postNewbook);
        res.status(201).json({ success: "Added Sucessfully" })
    } else {
        let book_id = await WishItem.findOneAndUpdate({ email: req.params.email }, { $addToSet: { books: req.body.bookid } }, {
            new: true,
            runValidators: true
        })
        res.json({ success: true, data: book_id });
    }
})


module.exports = { fetchAllWishItems, addWishItems }