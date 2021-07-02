import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
import * as actions from '../action/action'
import { connect } from 'react-redux';

function OrderSummary(props) {
    return (
        <div>

            <h5>
                subtotal items({props.OrderSummary.totalItems})
            </h5>
            <h5>Total:${props.OrderSummary.totalPrice}</h5>
            <h5>Delivery Charges:{props.OrderSummary.charges}</h5>
            <hr></hr>
            <h5>Cart Total:{props.amount}</h5>
            <hr></hr>

        </div>
    )
}


const mapStateToProps = (state) => {
    console.log('Inside', state);
    return {
        OrderSummary: state.BookReducerCart.orderSummary,
        amount: state.BookReducerCart.amount
    }
}


export default connect(mapStateToProps, null)(OrderSummary);