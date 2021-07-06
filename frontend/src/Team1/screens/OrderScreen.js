import React, { useEffect } from 'react'
import { Table, Row, Col } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listMyOrders } from '../actions/orderActions'
import FormContainer from '../components/FormContainer'

const OrderScreen = () => {
	const dispatch = useDispatch()

	const orderListMy = useSelector((state) => state.orderListMy)
	const { loading, error, orders } = orderListMy

	useEffect(() => {
		dispatch(listMyOrders())
	}, [dispatch])
	return (
		<>
			<Row>
				<Col md={12}>
					<h2>My Orders</h2>
					{loading ? (
						<Loader />
					) : error ? (
						<Message variant='danger'>{error}</Message>
					) : (
						<Table striped bordered hover responsive className='table-sm'>
							<thead>
								<tr>
									<th>ORDER ID</th>
									<th>ORDER STATUS</th>
									<th>ORDER DETAILS</th>
									<th>ORDER DATE</th>
									<th>AMOUNT</th>
									<th>PAYMENT STATUS</th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<tr key={order._id}>
										<td>{order._id}</td>
										<td>{order.status}</td>
										<td>
											{order.books.map((book) => (
												<ul>
													<li>{'Book Id: ' + book._id}</li>
													<li>{'Quantity: ' + book.quantity}</li>
													<li>{'ISBN: ' + book.isbn}</li>
												</ul>
											))}
										</td>
										<td>{order.orderDate.substring(0, 10)}</td>
										<td>{'₹' + order.amount}</td>
										<td>
											{order.paymentStatus ? (
												'Success'
											) : (
												<i className='fas fa-times' style={{ color: 'red' }}>
													FAILED
												</i>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}
				</Col>
			</Row>
		</>
	)
}

export default OrderScreen
