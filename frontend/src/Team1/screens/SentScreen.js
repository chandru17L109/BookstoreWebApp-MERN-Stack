import React from 'react'
import Message from '../components/Message'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer.js'
import { useState } from 'react'
const SentScreen = ({ history }) => {
	const [token, setToken] = useState('')
	const submitHandler = (e) => {
		e.preventDefault()

		// var val=JSON.stringify(link)
		history.push('/resetPassword/' + token)
	}
	const onTokenChange = (event) => {
		var tokenValue = event.target.value

		setToken(tokenValue)
	}
	return (
		<div>
			<Message variant='success'>MAIL SENT SUCCESSFULLY</Message>
			<FormContainer>
				<h1>Put the link here</h1>
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='token'>
						<Form.Label>Enter Token</Form.Label>
						<Form.Control
							type='text'
							placeholder='Put token here'
							value={token}
							onChange={onTokenChange}
						></Form.Control>
					</Form.Group>
					<br />
					<Button type='submit' variant='primary'>
						RESET PASSWORD
					</Button>
				</Form>
			</FormContainer>
		</div>
	)
}

export default SentScreen
