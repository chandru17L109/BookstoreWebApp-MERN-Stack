const express = require('express')
const { protect } = require( '../middleware/authMiddleware.js')

const router = express.Router()
const {
    getMyWishlist
} = require ('../controllers/wishlistController.js')

router.route('/mywishlist').get(protect,getMyWishlist)

module.exports = router