import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import { FaHeart, FaSignInAlt } from 'react-icons/fa'
// import { FaStar } from "react-icons/fa";

import { FaCartPlus } from 'react-icons/fa'

const Headers = () => {
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const dispatch = useDispatch()

	const logoutHandler = () => {
		console.log('logout')
		dispatch(logout())
	}

	return (
		<header>
			{userInfo ? (
				<>
					<LinkContainer to='/mywishlist'>
						<Nav.Link className='d-inline'>
							<Button className='btn btn-primary'>{' '}Wishlist <FaHeart />{' '}</Button>
						</Nav.Link>
					</LinkContainer>

					<LinkContainer to='/cartlist'>
						<Nav.Link className='d-inline'>
							<Button className='btn btn-primary'>
								{' '}
								Cart <FaCartPlus />{' '}
							</Button>
						</Nav.Link>
					</LinkContainer>
					<NavDropdown title={userInfo.name} id='username'>
						<LinkContainer to='/profile' className='d-inline'>
							<NavDropdown.Item>Profile Update</NavDropdown.Item>
						</LinkContainer>

						<NavDropdown.Item onClick={logoutHandler}>LogOut</NavDropdown.Item>
					</NavDropdown>
					<LinkContainer to='/myorders' className='d-inline'>
						<Nav.Link>MyOrders</Nav.Link>
					</LinkContainer>
				</>
			) : (
				<LinkContainer to='/login'>
					<Nav.Link>
						<Button className='btn btn-primary button2'>
							{' '}
							<FaSignInAlt /> Sign Up{' '}
						</Button>
					</Nav.Link>
				</LinkContainer>
			)}
		</header>
	)
}

export default Headers
