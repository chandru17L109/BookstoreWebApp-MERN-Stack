import React, { Component } from "react";
import { useState, useEffect } from "react";

import * as actions from '../action/action'
import { connect } from 'react-redux';

function OrderSummary(props) {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [charges, setCharges] = useState(0);
    const [cartTotal, setCarttotal] = useState(0);

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
        props.amount(cartTotal,props.userdetail.email)
    }, [
        props.Books,
        totalPrice,
        totalItems,
        charges,
        cartTotal
    ]);
    return (
        <div> 
            <h5>subtotal items({totalItems})</h5>
            <h5>Total Rs:{totalPrice}</h5>
            <h5>Delivery Charges:{charges}</h5>
            <hr></hr>
            <h5>
                Cart Total:{totalPrice + charges}
            </h5>
            <hr></hr>
        </div>
    )
}


const mapStateToProps = (state) => {
    console.log('Inside', state);
    return {
        Books: state.BookReducerCart.cart,
        amount: state.BookReducerCart.amount,
        userdetail : state.userLogin.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        amount: (cartTotal,useremail) => dispatch(actions.amountAction(cartTotal,useremail))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);