import React, { useState, useEffect } from "react";
import * as actions from "../action/action";
import { connect } from "react-redux";
import PaymentMode from '../components/PaymentMode';
import './PaymentScreen.css'
import {
  Col,
  Image,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
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
      <div className='header-container'>
        <h2>Select payment mode</h2>
      </div>
      <div className='payment-wrapper-container'>

        <div className='root-container'>

          <div className='payment-container'>

            <div className='left-container'>
              <div className={`payment-toggle ${showComp === 'COD' && 'payment-active'}`} onClick={onClickCOD}>Cash on delivery</div>
              <div className={`payment-toggle ${showComp === 'Card' && 'payment-active'}`} onClick={() => { setshowComp('Card') }}>Card Payment</div>
              <div className={`payment-toggle ${showComp === 'NB' && 'payment-active'}`} onClick={() => { setshowComp('NB') }}>Net Banking</div>
              <div className={`payment-toggle ${showComp === 'UPI' && 'payment-active'}`} onClick={() => { setshowComp('UPI') }}>UPI Payment</div>
            </div>
            <div className='right-container'>
              <PaymentMode comp={showComp} />
            </div>
          </div>
          <div className='delivery-card'>
            <h3 style={{ color: "#446e9b", fontWeight: "525", borderBottom: "solid 0.5px #446e9b", padding: "10px", boxShadow: "inset 0px 11px 8px -10px #CCC" }}> &nbsp; Delivery Address</h3>
            <Col style={{ color: "black" }}>
              <p className="name" >
                {props.address.name},
              </p>
              <p>House.no - {props.address.houseNumber}</p>

              <p>
                {props.address.locality}
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
              {props.address.phone ? (
                <p>Phone :{props.address.phone}</p>) : (<p>Phone :</p>
              )}
            </Col>
          </div>
        </div>
        <div className="order-container">
          <ListGroup variant="flush">
            <h2 className='heading' > &nbsp; Order Summary</h2>
            <ListGroupItem className='Book-style'>
              {props.cartItems.map(function (item) {
                return (
                  <>
                    <div className='book-container'>
                      {/* <div className='book-img-container col-2'>
                        <Image src={item.image} fluid rounded />
                      </div> */}
                      <div className='book-text'>
                        <p>{item.title}</p>
                      </div>
                      <div className='book-text'>
                        <p>Rs.{item.price}</p>
                      </div>
                      <div className='book-text'>
                        <p>Qty:{item.quantity}</p>
                      </div>
                    </div>
                    <h1></h1>
                  </>
                );
              })}
            </ListGroupItem>

            <div>
              <OrderSummary />
              <h5 className="heading">Cart Total Rs.{props.amount}</h5>

            </div>


          </ListGroup>


        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
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
