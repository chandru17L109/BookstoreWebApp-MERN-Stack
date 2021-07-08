import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Image, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'

import {
	getUserDetails,
	updateUserProfile,
	uploadProfilePic,
} from '../actions/userActions'

import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [photo, setPhoto] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [phone, setPhone] = useState('')
	const [message, setMessage] = useState(null)

	const [name_edit, editName] = useState(true)
	const [email_edit, editEmail] = useState(true)
	const [password_edit, editPassword] = useState(true)
	const [phone_edit, editPhone] = useState(true)

	const [selectedFile, setFile] = useState(null)

	//error handle
	const [phoneError, setPhoneError] = useState(true)
	const [emailError, setEmailError] = useState(true)
	const [nameError, setNameError] = useState(true)
	const [passwordError, setPasswordError] = useState(true)

	const [confirmPasswordError, setConfirmPasswordError] = useState(true)
	const onNameChange = (event) => {
		var nameValue = event.target.value
		const expression = new RegExp('^[a-zA-Z]{1}[a-zA-Z0-9\\s]{2,30}$')

		if (!expression.test(nameValue)) {
			setName(nameValue)
			setNameError(false)
		} else {
			setName(nameValue)
			setNameError(true)
		}
	}
	const onEmailChange = (event) => {
		var emailValue = event.target.value
		const expression = new RegExp(
			'^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'
		)

		if (!expression.test(emailValue)) {
			setEmail(emailValue)
			setEmailError(false)
		} else {
			setEmail(emailValue)
			setEmailError(true)
		}
	}
	const onPhoneChange = (event) => {
		var phoneValue = event.target.value
		const expression = new RegExp('^[6-9]{1}[0-9]{9}$')

		if (!expression.test(phoneValue)) {
			setPhone(phoneValue)
			setPhoneError(false)
		} else {
			setPhone(phoneValue)
			setPhoneError(true)
		}
	}
	const onPasswordChange = (event) => {
		var contactValue = event.target.value
		const expression = new RegExp(
			'^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$'
		)

		if (!expression.test(contactValue)) {
			setPassword(contactValue)
			setPasswordError(false)
		} else {
			setPassword(contactValue)
			setPasswordError(true)
		}
	}
	const onConfirmPasswordChange = (event) => {
		var contactValue = event.target.value
		const expression = new RegExp(
			'^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$'
		)

		if (!expression.test(contactValue)) {
			setConfirmPassword(contactValue)
			setConfirmPasswordError(false)
		} else {
			setConfirmPassword(contactValue)
			setConfirmPasswordError(true)
		}
	}

	const dispatch = useDispatch()

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const { success } = userUpdateProfile

	// const userUpdateProfilePic = useSelector(
	// 	(state) => state.userUpdateProfilePic
	// )
	//const { pic_success } = userUpdateProfilePic

	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		} else {
			if (!user || !user.name || success) {
				dispatch({ type: USER_UPDATE_PROFILE_RESET })
				dispatch(getUserDetails('profile'))
			} else {
				setName(user.name)
				setEmail(user.email)
				setPhoto(user.photo)
				setPhone(user.phone)
			}
			/*if (pic_success) {
				dispatch({ type: USER_UPDATE_PIC_RESET })
			}*/
		}
	}, [dispatch, history, userInfo, user, success /*pic_success*/])

	const submitHandler = (e) => {
		e.preventDefault()

		if (password !== confirmPassword) {
			setMessage('Passwords do not match')
		} else {
			setMessage('')
			dispatch(
				updateUserProfile({ id: user._id, name, email, password, photo, phone })
			)
			console.log('clicked')
		}
		editName(true)
		editEmail(true)
		editPassword(true)
		editPhone(true)
	}

	const uploadFileHandler = async (event) => {
		setFile(event.target.files[0])
	}

	const submitHandlerPic = (e) => {
		e.preventDefault()
		console.log('selected file ', selectedFile)

		dispatch(uploadProfilePic({ id: user._id }, { file: selectedFile }))
		window.location.reload()

		console.log('clicked')
	}

	const srcp = 'http://localhost:8080/dp/' + photo
	console.log(photo)
	return (
		<Container>
			<Row>
				<Col md={3}>
					<Form onSubmit={submitHandlerPic}>
						<Form.Group controlId='image'>
							<Form.Label></Form.Label>
							<Image
								width={200}
								height={180}
								value={photo}
								rounded
								src={srcp}
							></Image>
							<br />
							<Form.File
								id='image-file'
								onChange={uploadFileHandler}
							></Form.File>

							<Button type='submit' variant='primary'>
								Update Pic
							</Button>
						</Form.Group>

						<br />
					</Form>
				</Col>
				<Col md={3}>
					<h3>User Profile</h3>
					{message && <Message variant='danger'>{message}</Message>}

					{success && <Message variant='success'>Profile Updated</Message>}
					{loading ? (
						<Loader />
					) : error ? (
						<Message variant='danger'>{error}</Message>
					) : (
						<Form onSubmit={submitHandler}>
							<Row>
								<Form.Group controlId='name'>
									<Form.Label>Name</Form.Label>
									<Form.Control
										type='name'
										placeholder='Enter name'
										value={name}
										disabled={name_edit}
										onChange={onNameChange}
									></Form.Control>
									{!nameError && (
										<Form.Text className='text-danger'>
											Please Enter Valid Name (min char:3){' '}
										</Form.Text>
									)}
									<Button
										type='button'
										variant='primary'
										size='sm'
										onClick={(e) => editName(false)}
									>
										<i class='fa fa-edit'></i>
									</Button>
								</Form.Group>

								<Form.Group controlId='email'>
									<Form.Label>Email Address</Form.Label>
									<Form.Control
										type='email'
										placeholder='Enter email'
										value={email}
										disabled={email_edit}
										onChange={onEmailChange}
									></Form.Control>
									{!emailError && (
										<Form.Text className='text-danger'>
											Please Enter Valid Email (test@gmail.com){' '}
										</Form.Text>
									)}
									<Button
										type='button'
										variant='primary'
										size='sm'
										onClick={(e) => editEmail(false)}
									>
										<i class='fa fa-edit'></i>
									</Button>
								</Form.Group>

								<Form.Group controlId='phone'>
									<Form.Label>Mobile No.</Form.Label>
									<Form.Control
										type='phone'
										placeholder='Enter phone no'
										value={phone}
										disabled={phone_edit}
										onChange={onPhoneChange}
									></Form.Control>
									{!phoneError && (
										<Form.Text className='text-danger'>
											Please enter a valid 10 digit number starting with 6/7/8/9
										</Form.Text>
									)}
									<Button
										type='button'
										variant='primary'
										size='sm'
										onClick={(e) => editPhone(false)}
									>
										<i class='fa fa-edit'></i>
									</Button>
								</Form.Group>

								<Form.Group controlId='password'>
									<Form.Label>Password</Form.Label>
									<Form.Control
										type='password'
										placeholder='Enter password'
										value={password}
										disabled={password_edit}
										onChange={onPasswordChange}
									></Form.Control>
									{!passwordError && (
										<Form.Text className='text-danger'>
											Please Enter password (test@0t){' '}
										</Form.Text>
									)}
								</Form.Group>

								<Form.Group controlId='confirmPassword'>
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										type='password'
										placeholder='Confirm password'
										value={confirmPassword}
										disabled={password_edit}
										onChange={onConfirmPasswordChange}
									></Form.Control>
									{!confirmPasswordError && (
										<Form.Text className='text-danger'>
											Please match the confirm password (test@0t){' '}
										</Form.Text>
									)}
									<Button
										type='button'
										variant='primary'
										size='sm'
										onClick={(e) => editPassword(false)}
									>
										<i class='fa fa-edit'></i>
									</Button>
									<br />
									<br />

									<Button
										type='submit'
										variant='primary'
										disabled={
											!emailError ||
											!passwordError ||
											!nameError ||
											!phoneError ||
											!passwordError ||
											!confirmPasswordError
										}
									>
										Update Profile
									</Button>
								</Form.Group>
							</Row>
						</Form>
					)}
				</Col>
				<Col md={3}></Col>
			</Row>
		</Container>
	)
}

export default ProfileScreen
