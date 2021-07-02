import React, { Component } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useState, useEffect } from "react";
import * as actions from "../action/action";
import { connect } from "react-redux";
import EmptyCart from "../components/EmptyCart";

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
    props.onCartLoad();
  }, []);

  useEffect(() => {
    let items = 0;
    let price = 0;
    let charge = 0;
    let cart = 0;

    props.Books.forEach((item) => {
      console.log("quantity of each change", item.quantity);
      items += item.quantity * 1;
      price += item.quantity * item.price;
      charge += item.quantity * 10;
      cart += item.quantity * item.price + item.quantity * 10;
    });

    setTotalPrice(price);
    setTotalItems(items);
    setCharges(charge);
    setCarttotal(cart);
    props.OrderSummary(totalPrice, totalItems, charges, cartTotal);
    props.amount(cartTotal)
  }, [
    props.Books,
    totalPrice,
    totalItems,
    charges,
    cartTotal
  ]);

  const deleteCartItem = (_id) => {
    props.onDeleteItem(_id);
  };

  const moveToWishlist = (_id) => {
    props.onMoveItem(_id);
  };

  // const number = props.Books.length;

  return (
    <div>

      <Row>
        <h1>
          <span> Shopping Cart </span>
        </h1>
        {console.log("CARTLIST", props.Books)}
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

    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("Inside", state);
  return {
    Books: state.BookReducerCart.cart

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCartLoad: () => dispatch(actions.onCartLoadAction()),

    onDeleteItem: (_id) => dispatch(actions.onDeleteItemAction(_id)),

    onMoveItem: (_id) =>
      dispatch(actions.onMoveItemAction(_id)),

    OrderSummary: (totalPrice, totalItems, charges, cartTotal) =>
      dispatch(
        actions.OrderSummaryAction(totalPrice, totalItems, charges, cartTotal)
      ),
    amount: (cartTotal) => dispatch(actions.amountAction(cartTotal))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
