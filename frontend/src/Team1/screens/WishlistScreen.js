import React, { useState, useEffect } from 'react'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listMyWishlist, deleteFromWishlist } from '../actions/wishlistActions'
import '../../Team4/Styles/design.css'
import '../../Team4/Styles/homeContentCards.css'
import { Link } from 'react-router-dom'
import { FaCartPlus } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'
import CustomizedSnackbars from '../../Team4/alert_notify/alert'

const WishlistScreen = ({ history }) => {
	const dispatch = useDispatch()

	const wishlistListMy = useSelector((state) => state.wishlistListMy)
	const deletefromwishlist = useSelector((state) => state.deleteFromWishlist)

	const {
		loading: loadingWishlist,
		error: errorWishlist,
		wishlists,
	} = wishlistListMy
	const { success } = deletefromwishlist

	console.log('Wishlist Screen Data', wishlists)
	useEffect(() => {
		dispatch(listMyWishlist())
	}, [dispatch, history, success])

	const deletehandler = (e) => {
		//console.log(e)
		dispatch(deleteFromWishlist(e))
		console.log('delete button clicked')
	}

	return (
		<Container>
			<h2 className='text-center bg-light'>My Wishlist</h2>
			<Col>
				{loadingWishlist ? (
					<Loader />
				) : errorWishlist || wishlists.length === 0 ? (
					<Container className='cardmarign'>
						<br />
						<h3 className='text-center'>
							Wishlist is empty
							<Link to='/' variant='primary' className='text-primary'>
								{' '}
								Back To Home
							</Link>
						</h3>
						<br />
					</Container>
				) : (
					<Row>
						{wishlists.map((wishlist) => (
							<Col className='col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 cardmarign'>
								<Card className='card-top border-0 mb-4 card shadow rounded Cardshover'>
									<Link to={'/description/' + wishlist[0]._id}>
										<Card.Img
											className='card-header  leftpaddingcard bg-white'
											src={wishlist[0].image}
											variant='top'
										/>
									</Link>

									<Card.Body className='card-body  leftpaddingcarddata change-font text-dark'>
										<Card.Text as='div' className='cardtext'>
											<div className='text-dark'>
												<strong>{wishlist[0].title}</strong>
												<br></br>
												<strong style={{ fontWeight: 'normal' }}>
													{wishlist[0].authors}
												</strong>
											</div>

											<strong style={{ textDecorationLine: 'line-through' }}>
												Rs. {wishlist[0].price}
											</strong>
											<strong style={{ marginLeft: '7px', color: 'red' }}>
												Rs.
												{Math.round(
													wishlist[0].price -
														(wishlist[0].price * wishlist[0].discount) / 100
												)}
											</strong>

											<div className='aligncartwishlist'>
												<button
													class='btn btn-light border-0 wishlistbutton'
													id={wishlist[0]._id}
													onClick={(e) => deletehandler(wishlist[0]._id)}
												>
													<i className='text-danger '>
														<FaTrash />
													</i>
												</button>
											</div>
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				)}
			</Col>
		</Container>
	)
}

export default WishlistScreen

// <>
// <Card className="cardContainer">
//     <Row>
//         <Col md={4}>
//             <Card.Img className="cardsImage" variant="top" src={wishlist[0].image} width="100px" height="150px"/>
//         </Col>
//         <Col md={8}>
//             <Card.Body>
//                 <Card.Text>
//                     <h1 className="cardsHeading">Title : {wishlist[0].title}</h1>
//                     <h5 className="cardsText">Category : {wishlist[0].category}</h5>
//                     <h5 className="cardsText">Price : {wishlist[0].price}</h5>
//                 </Card.Text>
//             </Card.Body>
//                 <div>
//                     <button class="btn btn-light">
//                         <i className="text-primary ">Add to Cart</i>
//                     </button>
//                     <button class="btn btn-light">
//                         <i className="text-danger ">Remove from wishlist</i>
//                     </button>
//                 </div>
//         </Col>
//     </Row>
// </Card><br/>
// </>
