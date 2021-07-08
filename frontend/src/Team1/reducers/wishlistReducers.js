import {    
    WISH_LIST_MY_FAIL,
    WISH_LIST_MY_SUCCESS,
    WISH_LIST_MY_REQUEST,
    DELETE_FROM_WISHLIST_SUCCESS,
    DELETE_FROM_WISHLIST_FAIL,
    DELETE_FROM_WISHLIST_REQUEST
} from '../constants/wishlistConstants'
  

export const wishlistListMyReducer = (state = { wishlists: [] }, action) => {
    switch (action.type) {
      case WISH_LIST_MY_REQUEST:
        return {
          loading: true,
        }
      case WISH_LIST_MY_SUCCESS:
        return {
          loading: false,
          wishlists: action.payload,
        }
      case WISH_LIST_MY_FAIL:
        return {
          loading: false,
          error: action.payload,
        }
      default:
        return state
    }
  }

  export const deleteFromWishlistReducer = (state = { wishlists: [] }, action) => {
    console.log("Store wishlist ",action.payload)
    switch (action.type) {
      case DELETE_FROM_WISHLIST_REQUEST:
        return {
          loading: true,
        }
      case DELETE_FROM_WISHLIST_SUCCESS:
        return {
          loading: false,
          wishlists: action.payload,
          success:true,
          message: "Book Removed"
        }
      case DELETE_FROM_WISHLIST_FAIL:
        return {
          loading: false,
          error: action.payload,
        }
      default:
        return state
    }
  }

  