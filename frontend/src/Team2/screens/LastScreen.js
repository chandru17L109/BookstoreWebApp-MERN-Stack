import React from "react";
import { useEffect, useState } from "react";

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
import CustomizedSnackbars from '../../Team4/alert_notify/alert';

function LastScreen(props) {

  const [notify, setNotify] = useState(null)

  useEffect(() => {
    setNotify(<CustomizedSnackbars open={true} message={"Order Placed Successfully"} />)

    setTimeout(() => {
      setNotify(null)
    }, 2000)
    props.onCartLoad(props.userdetail.email);
    props.OnconfirmPayment(props.cartItems, props.address, props.amount, props.userdetail.email);
  }, []);
  return (
    <div>
      {notify}
      <h4>Thankyou for Shopping with BookStore</h4>
      <h5>Order Placed Successfully</h5>
      <p>
        You can check <Link>Your Order Details Here</Link>
      </p>
      {props.cartItems.map(function (item) {
        return (
          <>
            <Row className="ml-5 pl-5 ">
              <Col md={1}>
                <Image src={item.image} fluid rounded />
              </Col>
              <Col md={2}>
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
    userdetail: state.userLogin.userInfo
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
