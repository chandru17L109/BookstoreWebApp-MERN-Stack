import React, { useEffect, useState } from "react";
import * as actions from "../action/action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import './Button.css'

const Button = (props) => {
  const OnconfirmPayment = () => { };
  



  useEffect(() => {
    props.OnconfirmPayment(props.cartItems, props.address);
  }, []);
  return (
    <div className='button-wrapper'>
      {(!props.disable) && (
      <Link to="/lastScreen">
        <button className='red-button disabled' disabled={props.disable} onclick={OnconfirmPayment}>
          {props.children}
        </button>
      </Link>)}

      {(props.disable) && (
     
        <button className='red-button disabled' disabled={props.disable} onclick={OnconfirmPayment}>
          {props.children}
        </button>
      )}
      <div>
        <span>By placing this order, you agree to store's T&C</span>
      </div>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    address: state.BookReducer.address,
    cartItems: state.BookReducer.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    OnconfirmPayment: (cartItems, address) =>
      dispatch(actions.OnconfirmPaymentAction(cartItems, address)),
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(Button);
