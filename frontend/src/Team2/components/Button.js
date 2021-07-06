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
    address: state.BookReducerCart.selectedAddress,
    cartItems: state.BookReducerCart.cart,
    amount:state.BookReducerCart.amount,
    useremail:state.userLogin.userInfo.email
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    OnconfirmPayment: (cartItems, address,amount,useremail) =>
      dispatch(actions.OnconfirmPaymentAction(cartItems, address,amount,useremail)),
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(Button);
