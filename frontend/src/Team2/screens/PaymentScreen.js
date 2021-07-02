import React, { useEffect } from "react";
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
} from "react-bootstrap";
import { Link } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";

function PaymentScreen(props) {
  const OnconfirmPayment = () => {};

  useEffect(() => {
    console.log("-------/--------------", props.cartItems, props.address);
    props.OnconfirmPayment(props.cartItems, props.address);
  }, []);

  return (
    <div>
      <Col md={5}>
        <Card>
          <ListGroup variant="flush">
            <h3 style={{ color: "#fe019a" }}> &nbsp; order Summary</h3>
            <ListGroupItem>
              {props.cartItems.map(function (item) {
                return (
                  <>
                    <Row>
                      <Col md={1}>
                        <Image src={item.imageUrl} fluid rounded />
                      </Col>
                      <Col md={4}>
                        <p>{item.name}</p>
                      </Col>
                      <Col md={2}>
                        <p>${item.price}</p>
                      </Col>
                      <Col md={2}>
                        <p>Qty:{item.qty}</p>
                      </Col>
                    </Row>
                    <h1></h1>
                  </>
                );
              })}
            </ListGroupItem>

            <ListGroupItem>
              <OrderSummary />
            </ListGroupItem>

            <h3 style={{ color: "#fe019a" }}> &nbsp; Delivery Address</h3>
            <Col style={{ color: "black" }}>
              <p className="name" style={{ color: "black" }}>
                {props.address.name},
              </p>
              <p>{props.address.flat}</p>

              {props.address.landmark ? (
                <p>
                  {props.address.area}, {props.address.landmark}
                </p>
              ) : (
                <p>{props.address.area}</p>
              )}
              {props.address.city ? (
                <p>
                  {props.address.city} ,{props.address.pincode}
                </p>
              ) : (
                <p>{props.address.pincode}</p>
              )}

              {props.address.state ? (
                <p>
                  {props.address.state}, India,{props.address.mobile}
                </p>
              ) : (
                <p>India,{props.address.mobile}</p>
              )}
            </Col>
            <Link to="/lastScreen">
              <Button
                type="button"
                className="btn-block"
                onclick={OnconfirmPayment}
              >
                Confirm Payment
              </Button>
            </Link>
          </ListGroup>
        </Card>
      </Col>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    address: state.BookReducerCart.address,
    cartItems: state.BookReducerCart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    OnconfirmPayment: (cartItems, address) =>
      dispatch(actions.OnconfirmPaymentAction(cartItems, address)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);
