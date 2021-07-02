import React, { useState, useEffect, Component, history } from 'react'
import { Card, Row, Col, Container, Table, Button, ListGroupItem, Form } from 'react-bootstrap'
import { Link } from "react-router-dom";
import * as actions from '../action/action'
import { connect } from 'react-redux';

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { qty: 0 }
    }

    componentDidMount() {
        this.props.onOpenLoad()
    }


    addToCart(product) {
        this.props.addCartitem(product)
    }

    render() {
        console.log("books", this.props.Books)
        var productsList = this.props.Books.map((product, i) => {

            return (

                <Row md={3}>
                    <Col md={3}>
                        <Card className="card border-secondary mb-3">
                            <Link to={`/product/${1111}`}>
                                <Card.Img className="card-header" src={product.imageUrl}
                                    variant="top" />
                            </Link>
                            <Card.Body className="card-body text-dark">
                                <Link style={{ textDecoration: "none" }} to={`/product/${111}`}>
                                    <Card.Title as="div" className="text-dark">
                                        <strong>{product.name}</strong>
                                    </Card.Title>
                                </Link>

                                <Card.Text as="div">
                                    <strong>Price: {product.price}</strong>
                                </Card.Text>
                                <Card.Text as="div">
                                    <strong>Description: {product.description}</strong>
                                </Card.Text>
                                <Card.Text as="div">
                                    <strong>Count In Stock: {product.countInStock}</strong>
                                </Card.Text>

                                <Button onClick={this.addToCart.bind(this, product)}>Add To Cart</Button>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )
        })

        return (
            <>
                {productsList}
            </>
        )
    }
}




const mapStateToProps = (state) => {
    console.log('Inside', state);
    return {
        Books: state.BookReducerCart.books
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOpenLoad: () =>
            dispatch(actions.onOpenLoadAction()),
        addCartitem: (product) =>
            dispatch(actions.addCartitemAction(product)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
