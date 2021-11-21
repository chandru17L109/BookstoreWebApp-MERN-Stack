import React, { useEffect } from 'react'
import { Container, Card, Table, Row, Col } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listMyOrders } from '../actions/orderActions'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'

const OrderScreen = () => {
	const dispatch = useDispatch()

	const orderListMy = useSelector((state) => state.orderListMy)
	const { loading, error, orders } = orderListMy

	useEffect(() => {
		dispatch(listMyOrders())
	}, [dispatch])
	return (
		// <>
		// 	<Row>
		// 		<Col md={12}>
		// 			<h2 className="text-center bg-light">My Orders</h2>
		// 			{loading ? (
		// 				<Loader />
		// 			) : error || orders.length==0? (
		// 				<Container className="col-xl-3 cardmarign">
		//                     <br/><h1 variant='danger' className="text-center">Orders is empty</h1><br/>
		//                 </Container>
		// 			) : (
		// 				<Table striped bordered hover responsive className='table-sm'>
		// 					<thead>
		// 						<tr>
		// 							<th>ORDER ID</th>
		// 							<th>ORDER STATUS</th>
		// 							<th>ORDER DETAILS</th>
		// 							<th>ORDER DATE</th>
		// 							<th>AMOUNT</th>
		// 							<th>PAYMENT STATUS</th>
		// 						</tr>
		// 					</thead>
		// 					<tbody>
		// 						{orders.map((order) => (
		// 							<tr key={order._id}>
		// 								<td>{order._id}</td>
		// 								<td>{order.status}</td>
		// 								<td>
		// 									{order.books.map((book) => (
		// 										<ul>
		// 											<li>{'Book Id: ' + book._id}</li>
		// 											<li>{'Quantity: ' + book.quantity}</li>
		// 											<li>{'ISBN: ' + book.isbn}</li>
		// 										</ul>
		// 									))}
		// 								</td>

		// 								<td>{order.orderDate.substring(0, 10)}</td>
		// 								<td>{'₹' + order.amount}</td>
		// 								<td>
		// 									{order.paymentStatus ? (
		// 										'Success'
		// 									) : (
		// 										<i className='fas fa-times' style={{ color: 'red' }}>
		// 											FAILED
		// 										</i>
		// 									)}
		// 								</td>
		// 							</tr>
		// 						))}
		// 					</tbody>
		// 				</Table>
		// 			)}
		// 		</Col>
		// 	</Row>
		// </>
		<Container>
			<h2 className='text-center bg-light'>My Orders</h2>
			<Col>
				{loading ? (
					<Loader />
				) : error || orders.length === 0 ? (
					<Container className='cardmarign'>
						<br />
						<h1 variant='danger' className='text-center'>
							No orders yet
						</h1>
						<br />
					</Container>
				) : (
					<Row>
						{orders.map((order) => (
							<Col className='col-12 col-sm-12 col-xl-4 cardmarign'>
								<Card className='border-0 card shadow mb-4 rounded Cardshover'>
									<Card.Body className='card-body  text-dark'>
										<Card.Text className='cardtext'>
											<div className='text-dark'>
												<small>
													<strong>Status: {order.status}</strong>
												</small>
												<br></br>
												<strong>Order Id: </strong>
												<strong style={{ fontWeight: 'normal' }}>
													{' '}
													{order._id}
												</strong>
												<br></br>
												<strong>Order Date: </strong>
												<strong style={{ fontWeight: 'normal' }}>
													{' '}
													{order.orderDate}
												</strong>
												<br></br>
												<strong>Order Details: </strong>
												<br></br>
												{order.books.map((book) => (
													<ul>
														<li>Book Id: {book._id}</li>
														<li>Quantity: {book.quantity}</li>
														<li>ISBN: {book.isbn}</li>
													</ul>
												))}
											</div>
											<strong>Amount: </strong>
											<strong style={{ fontWeight: 'normal' }}>
												{' '}
												₹{order.amount}
											</strong>
											<br></br>
											<strong>Payment Status:</strong>
											{order.paymentStatus ? (
												' Success'
											) : (
												<i className='fas fa-times' style={{ color: 'red' }}>
													FAILED
												</i>
											)}
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

export default OrderScreen
