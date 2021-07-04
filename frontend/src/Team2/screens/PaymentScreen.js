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

  useEffect(() => {
    props.onCartLoad(props.userdetail.email);
  }, []);

  return (
    <div>
      <Col className="ml-5" md={5}>
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
                        <p>{item.title}</p>
                      </Col>
                      <Col md={3}>
                        <p>${item.price}</p>
                      </Col>
                      <Col md={3}>
                        <p>Qty:{item.quantity}</p>
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
              <p>{props.address.houseNumber}</p>

              <p>
                {props.address.locality},{props.address.phone}
              </p>

              {props.address.city ? (
                <p>
                  {props.address.city} ,{props.address.pinCode}
                </p>
              ) : (
                <p>{props.address.pinCode}</p>
              )}

              {props.address.state ? (
                <p>{props.address.state}, India</p>
              ) : (
                <p>India</p>
              )}
            </Col>
            <Link to="/lastScreen">
              <Button type="button" className="btn-block">
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
    amount: state.BookReducerCart.amount,
    userdetail : state.userLogin.userInfo

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCartLoad: (useremail) => dispatch(actions.onCartLoadAction(useremail)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);
