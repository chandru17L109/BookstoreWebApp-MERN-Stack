import React from "react";
import { useEffect } from "react";

import * as actions from "../action/action";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Button,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function LastScreen(props) {
  useEffect(() => {
    props.onCartLoad(props.userdetail.email);
    props.OnconfirmPayment(props.cartItems, props.address, props.amount, props.userdetail.email);
  }, []);
  return (
    <div>
      <h4>Thankyou for Shopping with BookStore</h4>
      <p>
        You can check <Link>Your Order Details Here</Link>
      </p>
      {props.cartItems.map(function (item) {
        return (
          <>
            <Row>
              <Col md={1}>
                <Image src={item.imageUrl} fluid rounded />
              </Col>
              <Col md={4}>
                <p>{item.title}</p>
              </Col>
              <Col md={2}>
                <p>${item.price}</p>
              </Col>
              <Col md={2}>
                <p>Qty:{item.quantity}</p>
              </Col>
            </Row>
            <h1></h1>
          </>
        );
      })}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.BookReducerCart.cart,
    address: state.BookReducerCart.address,
    amount: state.BookReducerCart.amount,
    userdetail : state.userLogin.userInfo
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onCartLoad: (useremail) => dispatch(actions.onCartLoadAction(useremail)),
    OnconfirmPayment: (cartItems, address, amount, useremail) =>
      dispatch(actions.OnconfirmPaymentAction(cartItems, address, amount, useremail)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LastScreen);
