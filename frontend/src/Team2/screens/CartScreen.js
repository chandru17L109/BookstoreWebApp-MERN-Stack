import React, { Component } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useState, useEffect } from "react";
import * as actions from "../action/action";
import { connect } from "react-redux";
import EmptyCart from "../components/EmptyCart";
import TodayDealsPage from '../../Team4/Screen/HomePage/Components/BookListComponents/todaydeals';

import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
  FormControl,
} from "react-bootstrap";
import OrderSummary from "../components/OrderSummary";

const CartScreen = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [charges, setCharges] = useState(0);
  const [cartTotal, setCarttotal] = useState(0);

  useEffect(() => {
    props.onCartLoad(props.userdetail.email);
  }, []);

  const deleteCartItem = (_id) => {
    props.onDeleteItem(_id,props.userdetail.email);
  };

  const moveToWishlist = (_id) => {
    props.onMoveItem(_id,props.userdetail.email);
  };

  // const number = props.Books.length;

  return (
    <div>
      {props.Books ? (
        <Row>
          <h1>
            <span> Shopping Cart </span>
          </h1>
          {console.log("cartlist", props.Books)}
          {props.Books.map(function (item) {
            return (
              <Col sm={8}>
                <CartItem
                  key={item._id}
                  item={item}
                  moveTo={moveToWishlist}
                  remove={deleteCartItem}
                />
              </Col>
            );
          })}
          <br></br>
          <Col sm={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <FormControl
                    className="form-control me-sm-2"
                    type="text"
                    placeholder="Apply Coupon"
                    style={{ height: "50px" }}
                    className="mr-sm-2"
                  />
                </ListGroupItem>
                <ListGroupItem>
                  <Button
                    className="btn btn-primary my-2 my-sm-0"
                    type="submit"
                  >
                    Apply Coupon
                  </Button>
                </ListGroupItem>

                <ListGroupItem>
                  <OrderSummary />
                </ListGroupItem>
                <Link to="/address">
                  <Button type="button" className="btn-block">
                    Proceed to checkOut
                  </Button>
                </Link>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      ) : (
        <EmptyCart></EmptyCart>
      )}
      <div className="row">
          <h6>Books You May Like</h6>
        <TodayDealsPage props={props.props}/>
          </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("Inside", state);
  return {
    Books: state.BookReducerCart.cart,
    userdetail : state.userLogin.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCartLoad: (useremail) => dispatch(actions.onCartLoadAction(useremail)),

    onDeleteItem: (_id,useremail) => dispatch(actions.onDeleteItemAction(_id,useremail)),

    onMoveItem: (_id,useremail) => dispatch(actions.onMoveItemAction(_id,useremail)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
