import React, { useState, useEffect } from "react";
import * as actions from "../action/action";
import { connect } from "react-redux";
import PaymentMode from '../components/PaymentMode';
import './PaymentScreen.css'
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
  const [showComp, setshowComp] = useState('COD');


  function onClickCOD() {
    setshowComp('COD');
  }
  function onClickCard() {
    setshowComp('Card');
  }
  function onClickNB() {
    setshowComp('NB');
  }
  function onClickUPI() {
    setshowComp('UPI');
  }
  return (
    <div>
      <h2>Select Payment Mode</h2>

      <div className='main-container'>
        <div className='left-container'>
          <div className={`payment-toggle ${showComp === 'COD' && 'payment-active'}`} onClick={onClickCOD}>Cash on delivery</div>
          <div className={`payment-toggle ${showComp === 'Card' && 'payment-active'}`} onClick={() => { setshowComp('Card') }}>Card Payment</div>
          <div className={`payment-toggle ${showComp === 'NB' && 'payment-active'}`} onClick={() => { setshowComp('NB') }}>Net Banking</div>
          <div className={`payment-toggle ${showComp === 'UPI' && 'payment-active'}`} onClick={() => { setshowComp('UPI') }}>UPI Payment</div>
        </div>
        <div className='right-container'>
          <PaymentMode comp={showComp} />
        </div>
        <Col className="ml-5" md={5}>
          <Card>
            <ListGroup variant="flush">
              <h3 style={{ color: "#fe019a" }}> &nbsp; order Summary</h3>
              <ListGroupItem>
                {props.cartItems.map(function (item) {
                  return (
                    <>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} fluid rounded />
                        </Col>
                        <Col md={3}>
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
                <h5 className="text-primary">Cart Total Rs.{props.amount}</h5>

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
              {/* <Link to="/lastScreen">
                <Button type="button" className="btn-block">
                  Confirm Payment
                </Button>
              </Link> */}
            </ListGroup>
          </Card>
        </Col>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log("selected address",state.BookReducerCart.selectedAddress)
  return {
    address: state.BookReducerCart.selectedAddress,
    cartItems: state.BookReducerCart.cart,
    amount: state.BookReducerCart.amount,
    userdetail: state.userLogin.userInfo

  };

};

const mapDispatchToProps = (dispatch) => {
  return {
    onCartLoad: (useremail) => dispatch(actions.onCartLoadAction(useremail)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);
