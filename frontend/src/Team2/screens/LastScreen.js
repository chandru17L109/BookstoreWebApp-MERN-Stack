import React from "react";
import { useEffect, useState } from "react";
import './LastScreen.css';
import * as actions from "../action/action";
import { ReactComponent as OkLogo } from '../Icons/icons8-ok.svg';
import { connect } from "react-redux";
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
    <div className="order-confirm-card">
      {notify}
      <h4>Thank you for shopping with us</h4>
      <OkLogo />
      <h4>Order Placed Successfully</h4>
      <h4>
        You can check <Link to={"/myorders"} >your order details here</Link>
      </h4>
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
