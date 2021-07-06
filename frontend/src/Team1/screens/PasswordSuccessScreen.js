import React from 'react'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
const PasswordSuccessScreen = () => {
	return (
		<div>
			<Message variant='success'>PASSWORD CHANGED SUCCESSFULLY</Message>
			<center>
				<p>
					Click here to <Link to='/login'>LOGIN</Link>
				</p>
			</center>
		</div>
	)
}

export default PasswordSuccessScreen
