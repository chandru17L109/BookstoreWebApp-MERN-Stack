import {
	ORDER_LIST_MY_FAIL,
	ORDER_LIST_MY_SUCCESS,
	ORDER_LIST_MY_REQUEST,
} from '../constants/orderConstants'

export const orderListMyReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_LIST_MY_REQUEST:
			return {
				loading: true,
			}
		case ORDER_LIST_MY_SUCCESS:
			return {
				loading: false,
				orders: action.payload,
			}
		case ORDER_LIST_MY_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}
