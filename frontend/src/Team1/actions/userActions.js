import axios from 'axios'
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_FAIL,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_FAIL,
	// USER_UPDATE_PROFILE_RESET,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	NEW_PASSWORD_REQUEST,
	NEW_PASSWORD_SUCCESS,
	NEW_PASSWORD_FAIL,
	
	USER_DETAILS_RESET,
	USER_UPDATE_PIC_FAIL,
	USER_UPDATE_PIC_SUCCESS,
	USER_UPDATE_PIC_REQUEST,
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		})
		const config = {
			headers: {
				'content-type': 'application/json',
			},
		}
		const { data } = await axios.post(
			'https://bookstore-13.herokuapp.com/api/users/login',
			{ email, password },
			config
		)
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
export const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo')
	dispatch({ type: USER_LOGOUT })
	dispatch({ type: USER_DETAILS_RESET })
	document.location.href = '/'
}

//register a new User
export const register = (name, email, password, phone) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		})

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post(
			'https://bookstore-13.herokuapp.com/api/users/',
			{ name, email, password, phone },
			config
		)

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		})

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})

		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DETAILS_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.get(
			`https://bookstore-13.herokuapp.com/api/users/${id}`,
			config
		)

		dispatch({
			type: USER_DETAILS_SUCCESS,
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
			type: USER_DETAILS_FAIL,
			payload: message,
		})
	}
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_PROFILE_REQUEST,
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
		//user is the data we need to update with
		const { data } = await axios.put(
			`https://bookstore-13.herokuapp.com/api/users/profile`,
			user,
			config
		)

		dispatch({
			type: USER_UPDATE_PROFILE_SUCCESS,
			payload: data,
		})
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		/*dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })*/
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload: message,
		})
	}
}

// profile pic update

export const uploadProfilePic = (user, files) => async (dispatch) => {
	console.log('upload method user.file ', files.file.name)
	console.log('upload method user.id ', user.id)
	try {
		dispatch({
			type: USER_UPDATE_PIC_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}
		const formData = new FormData()
		formData.append('file', files.file)
		const { data } = await axios.put(
			'https://bookstore-13.herokuapp.com/api/users/upload/' + user.id,
			formData,
			config
		)
		dispatch({
			type: USER_UPDATE_PIC_SUCCESS,
			payload: data,
		})

		// localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		console.log('Action Error!')
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		console.log('error message', message)
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: USER_UPDATE_PIC_FAIL,
			payload: message,
		})
	}
}



export const forgotPassword = (email) => async (dispatch) => {
	console.log('Email', email)
	// const mail=email.get("email")
	try {
		dispatch({ type: FORGOT_PASSWORD_REQUEST })

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post(
			'https://bookstore-13.herokuapp.com/api/users/forgotPassword',
			{ email },
			config
		)

		dispatch({
			type: FORGOT_PASSWORD_SUCCESS,
			payload: data.message,
		})
	} catch (error) {
		dispatch({
			type: FORGOT_PASSWORD_FAIL,
			payload: error.response.data.message,
		})
	}
}

/*
Reset password
*/
export const resetPassword =
	(token, password, confirmPassword) => async (dispatch) => {
		try {
			dispatch({ type: NEW_PASSWORD_REQUEST })

			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}

			const { data } = await axios.put(
				`https://bookstore-13.herokuapp.com/api/users/resetPassword/${token}`,
				{ password, confirmPassword },
				config
			)

			dispatch({
				type: NEW_PASSWORD_SUCCESS,
				payload: data.message,
			})
		} catch (error) {
			dispatch({
				type: NEW_PASSWORD_FAIL,
				payload: error.response.data.message,
			})
		}
	}
