import React from "react";
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
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function LastScreen(props) {
  return (
    <div>
      <h4>Thankyou for Shopping with BookStore</h4>
      <p>
        You can check <Link>Your Order Details Here</Link>
      </p>
      {props.orders.map(function (ordereditem) {
        return (
          <>
            <Row>
              <Col md={1}>
                <Image src={ordereditem.imageUrl} fluid rounded />
              </Col>
              <Col md={4}>
                <p>{ordereditem.name}</p>
              </Col>
              <Col md={2}>
                <p>${ordereditem.price}</p>
              </Col>
              <Col md={2}>
                <p>Qty:{ordereditem.qty}</p>
              </Col>
            </Row>
            <h1></h1>
          </>
        );
      })}
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log("last screen inside inside", state.BookReducerCart.orders[0].books);
  return {
    orders: state.BookReducerCart.orders[state.BookReducerCart.orders.length - 1].books,
  };
};
export default connect(mapStateToProps, null)(LastScreen);
