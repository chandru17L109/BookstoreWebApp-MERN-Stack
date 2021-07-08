import axios from 'axios'
import {
    WISH_LIST_MY_FAIL,
    WISH_LIST_MY_SUCCESS,
    WISH_LIST_MY_REQUEST,
    DELETE_FROM_WISHLIST_SUCCESS,
    DELETE_FROM_WISHLIST_FAIL,
    DELETE_FROM_WISHLIST_REQUEST
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
          'Content-Type': 'application/json',
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

  export const deleteFromWishlist = (id) => async (dispatch, getState) => {
    console.log("Delete from wishlist id ",id)
    try {
      dispatch({
        type: DELETE_FROM_WISHLIST_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.put(`http://localhost:8080/api/wishlists/mywishlist/`+ id,{id},config)
      
      console.log("actions data",data)
      dispatch({
        type: DELETE_FROM_WISHLIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({
        type: DELETE_FROM_WISHLIST_FAIL,
        payload: message,
      })
    }
  }


//   export const onDeleteItemAction = (_id, useremail) => {
//     console.log("ProductId", _id);
//     return (dispatch) => {
//         return fetch(
//             `http://localhost:8080/api/v1/cartItems/${useremail}`,
//             {
//                 headers: {
//                     Accept: "application/json",
//                     "Content-type": "application/json",
//                 },
//                 method: "DELETE",
//                 body: JSON.stringify({ bookid: _id }),
//             }
//         )
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log("before fetch", data);
//                 fetch(`http://localhost:8080/api/v1/cartItems/${useremail}`, {
//                     headers: {
//                         Accept: "application/json",
//                         "Content-type": "application/json",
//                     },
//                 })
//                     .then((res) => res.json())
//                     .then((data) => {
//                         console.log("data", data);
//                         dispatch({
//                             type: ON_DELETE_ITEM,
//                             payload: data.data,
//                         });
//                     });
//             });
//     };
// };