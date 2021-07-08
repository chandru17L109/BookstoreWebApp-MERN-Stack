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
	}, [dispatch, history, userInfo, user, success])

	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setMessage('Passwords do not match')
		} else {
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
					<h2>User Profile</h2>
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
									<br />
									<div style={{ display: 'inline-flex' }}>
										<Form.Control
											type='name'
											placeholder='Enter name'
											value={name}
											disabled={name_edit}
											onChange={(e) => setName(e.target.value)}
										></Form.Control>
										<Button
											type='button'
											variant='primary'
											size='sm'
											style={{ float: 'right' }}
											onClick={(e) => editName(false)}
										>
											<i className='fa fa-edit '></i>
										</Button>
									</div>
								</Form.Group>
								<br />
								<Form.Group controlId='email'>
									<Form.Label>Email Address</Form.Label>
									<br />
									<div style={{ display: 'inline-flex' }}>
										<Form.Control
											type='email'
											placeholder='Enter email'
											value={email}
											disabled={email_edit}
											onChange={(e) => setEmail(e.target.value)}
										></Form.Control>
										<Button
											type='button'
											variant='primary'
											size='sm'
											style={{ float: 'right' }}
											onClick={(e) => editEmail(false)}
										>
											<i className='fa fa-edit '></i>
										</Button>
									</div>
								</Form.Group>
								<br />
								<Form.Group controlId='phone'>
									<Form.Label>Mobile No.</Form.Label>
									<br />
									<div style={{ display: 'inline-flex' }}>
										<Form.Control
											type='phone'
											placeholder='Enter phone no'
											value={phone}
											disabled={phone_edit}
											onChange={(e) => setPhone(e.target.value)}
										></Form.Control>
										<Button
											type='button'
											variant='primary'
											size='sm'
											style={{ float: 'right' }}
											onClick={(e) => editPhone(false)}
										>
											<i className='fa fa-edit '></i>
										</Button>
									</div>
								</Form.Group>
								<Form.Group controlId='password'>
									<Form.Label>Password</Form.Label>
									<br />
									<div style={{ display: 'inline-flex' }}>
										<Form.Control
											type='password'
											placeholder='Enter password'
											value={password}
											disabled={password_edit}
											onChange={(e) => setPassword(e.target.value)}
										></Form.Control>
									</div>
								</Form.Group>
								<br />

								<Form.Group controlId='confirmPassword'>
									<Form.Label>Confirm Password</Form.Label>
									<br />
									<div style={{ display: 'inline-flex' }}>
										<Form.Control
											type='password'
											placeholder='Confirm password'
											value={confirmPassword}
											disabled={password_edit}
											onChange={(e) => setConfirmPassword(e.target.value)}
										></Form.Control>
										<Button
											type='button'
											variant='primary'
											size='sm'
											style={{ float: 'right' }}
											onClick={(e) => editPassword(false)}
										>
											<i className='fa fa-edit '></i>
										</Button>
									</div>
									<br />
									<br />

									<Button type='submit' variant='primary'>
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
