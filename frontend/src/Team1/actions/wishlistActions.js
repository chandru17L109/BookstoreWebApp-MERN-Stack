import axios from 'axios'
import {
    WISH_LIST_MY_FAIL,
    WISH_LIST_MY_SUCCESS,
    WISH_LIST_MY_REQUEST,
} from '../constants/wishlistConstants'
import { logout } from '../actions/userActions'

export const listMyWishlist = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: WISH_LIST_MY_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`http://localhost:8080/api/wishlists/mywishlist`, config)
      console.log("actions data",data)
      dispatch({
        type: WISH_LIST_MY_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: WISH_LIST_MY_FAIL,
        payload: message,
      })
    }
  }