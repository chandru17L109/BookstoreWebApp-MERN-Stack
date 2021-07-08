const express = require('express')
const { protect } = require( '../middleware/authMiddleware.js')

const router = express.Router()
const {
    getMyWishlist,removefromWishlist
} = require ('../controllers/wishlistController.js')

router.route('/mywishlist').get(protect,getMyWishlist)
router.route('/mywishlist/:id').put(protect,removefromWishlist)

module.exports = router