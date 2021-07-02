

import React, { Component } from 'react'
import { Link } from "react-router-dom";

import {
    Row,
    Col,
    Form,
    Button,
    Card,
    Image,
    ListGroup,
    ListGroupItem,
    FormControl
} from "react-bootstrap";
import * as actions from '../action/action'
import { connect } from 'react-redux';

class WishScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    componentDidMount() {
        this.props.onWishLoad()
    }

    addToCart(wishItem) {
        this.props.addCartitemWish(wishItem)
    }


    render() {

        var wishItemsList = this.props.Books.map((wishItem, i) => {
            return (

                <ListGroup variant="flush">
                    <ListGroupItem>
                        <Row>
                            <Col md={2}>
                                <Link to={`/`}><Image src={wishItem.imageUrl} fluid rounded />
                                </Link>
                            </Col>
                            <Col sm={1}>
                                <Link to={`/`}>{wishItem.name}</Link>
                            </Col>
                            <Col sm={1}>
                                Price:{wishItem.description}
                            </Col>
                            <Col sm={1}>${wishItem.price}</Col>
                            <Col sm={2}>
                                <Form.Control as="select" style={{ height: "50px", color: "red" }}>
                                    Quantity:
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>

                                </Form.Control>
                            </Col>
                            <Col md={3}>
                                <Button type="button"
                                    onClick={this.addToCart.bind(this, wishItem)}
                                >
                                    Add To Cart
                                </Button>
                            </Col>

                        </Row>
                    </ListGroupItem>
                </ListGroup>
            );
        })



        return (

            <>
                <Row>
                    <Col md={8}>
                        {wishItemsList}
                    </Col>
                </Row>
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
        onWishLoad: () =>
            dispatch(actions.onWishLoadAction()),
        addCartitemWish: (wishItem) =>
            dispatch(actions.addCartitemWishAction(wishItem)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishScreen);