import {    
    WISH_LIST_MY_FAIL,
    WISH_LIST_MY_SUCCESS,
    WISH_LIST_MY_REQUEST
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