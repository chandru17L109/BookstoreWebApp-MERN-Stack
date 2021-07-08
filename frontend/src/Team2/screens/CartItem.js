import react, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import * as actions from '../action/action'
import { connect } from 'react-redux';

import {
    Row,
    Col,
    Form,
    Button,
    Card,
    Image,
    ListGroup,
    ListGroupItem,
    FormControl,
} from "react-bootstrap";
import './CartItem.css';

const Item = (props) => {

    const [price, setPrice] = useState(0)

    const xyz = (props.item.price) * (1 - (props.item.discount / 100))
    // const onChangeHandler = (e) => {
    //     setInput(e.target.value);
    //     props.adjustQty(props.item._id, e.target.value, props.userdetail.email);
    // };

    const onAdd = (event) => {
        props.onQuantityChange(props.item._id, props.userdetail.email, "add", props.item.available)
    }
    const onMinus = (event) => {
        props.onQuantityChange(props.item._id, props.userdetail.email, "minus", props.item.available)
    }

    const move = (event) => {
        props.moveTo(props.item._id);
    };
    const del = (event) => {
        props.remove(props.item._id);
    }

    return (
        <>


            <ListGroup variant="flush">
                <ListGroupItem>
                    <div id="cart_item">
                        <Row>

                            <Col md={1} >
                                <Link to={`/`}>
                                    <Image src={props.item.image} fluid rounded />
                                </Link>
                            </Col>

                            <Col md={2} >
                                <Link to={`/`}>{props.item.title}   </Link>
                            </Col>

                            <Col md={2}>Rs.{Math.round(xyz)}</Col>

                            <Col md={1}>

                                <Button onClick={onMinus}>-</Button>
                            </Col>
                            <Col md={1}>
                                <p>{props.item.quantity}</p>
                            </Col>
                            <Col md={1}>
                                <Button onClick={onAdd}>+</Button>
                            </Col>

                            <Col md={2} >
                                <Button onClick={move} type="button" className="btn btn-primary mr-5">
                                    Move To Wishlist
                                </Button>
                            </Col>
                            <Col >
                                <Button onClick={del} type="button" className="btn btn-danger ml-5">
                                    <i
                                        className="fa fa-trash "
                                        aria-hidden="true"
                                    ></i>
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </ListGroupItem>
            </ListGroup>



        </>
    );
};


const mapStateToProps = (state) => {
    console.log('Inside', state);
    return {
        userdetail: state.userLogin.userInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // adjustQty: (_id, value, useremail) => dispatch(actions.adjustItemQty(_id, value, useremail)),
        onQuantityChange: (_id, useremail, QuantityChange, max) => dispatch(actions.onQuantityChangeAction(_id, useremail, QuantityChange, max)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
