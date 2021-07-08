import React from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useState, useEffect } from "react";
import * as actions from "../action/action";
import { connect } from "react-redux";
import EmptyCart from "../components/EmptyCart";
import TodayDealsPage from '../../Team4/Screen/HomePage/Components/BookListComponents/todaydeals';
import './CartScreen.css'
import {
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import './CartItem.css';
import Coupon from "../components/Coupon";
import CustomizedSnackbars from '../../Team4/alert_notify/alert';


const CartScreen = (props) => {
  const [totalItems, setTotalItems] = useState(0);

  const [notify, setNotify] = useState(null)

  useEffect(() => {
    props.onCartLoad(props.userdetail.email);
    localStorage.setItem('couponvalue', 0);
  }, []);

  const deleteCartItem = (_id) => {
    setNotify(<CustomizedSnackbars open={true} message={"Item Deleted Successfully"} />)

    setTimeout(() => {
      setNotify(null)
    }, 2000)
    props.onDeleteItem(_id, props.userdetail.email);
  };

  const moveToWishlist = (_id) => {
    setNotify(<CustomizedSnackbars open={true} message={"Item moved to wishlist successfully"} />)

    setTimeout(() => {
      setNotify(null)
    }, 2000)
    props.onMoveItem(_id, props.userdetail.email);
  };
  var len = 0;
  if (props.Books) {
    len = props.Books.length;
  }


  return (

    <div>

      {len ? (
        <div className='main-container'>
          <h1>
            <span> Shopping Cart </span>
          </h1>
          <div className='cart-wrapper-container' >
            <div className='cart-items' >
              {props.Books.map(function (item) {
                return (
                  <div >
                    <CartItem
                      key={item._id}
                      item={item}
                      moveTo={moveToWishlist}
                      remove={deleteCartItem}
                    />
                  </div>
                );
              })}
            </div>

            {notify}
            <div className='coupon-container'>
              <Card>
                <ListGroup variant="flush">
                  <Coupon />
                  <Link to="/address">
                    <Button type="button" className="btn-block ">
                      Proceed to checkOut
                    </Button>
                  </Link>
                </ListGroup>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart></EmptyCart>
      )}
      <div className="row">
        <h4 className="ml-4">Books You May Like</h4>
        <TodayDealsPage props={props.props} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    OrderSummary: state.BookReducerCart.orderSummary,
    Books: state.BookReducerCart.cart,
    userdetail: state.userLogin.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCartLoad: (useremail) => dispatch(actions.onCartLoadAction(useremail)),

    onDeleteItem: (_id, useremail) => dispatch(actions.onDeleteItemAction(_id, useremail)),

    onMoveItem: (_id, useremail) => dispatch(actions.onMoveItemAction(_id, useremail)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
