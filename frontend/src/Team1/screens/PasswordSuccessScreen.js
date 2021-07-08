import React from 'react'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer.js'
const PasswordSuccessScreen = () => {
	return (
		<div>
			<FormContainer>
				<Message variant='success'>PASSWORD CHANGED SUCCESSFULLY</Message>
			</FormContainer>
			<center>
				<h3>
					Click here to{' '}
					<a>
						<Link to='/login' variant='primary' className='text-primary'>
							LOGIN
						</Link>
					</a>
				</h3>
			</center>
		</div>
	)
}

export default PasswordSuccessScreen
