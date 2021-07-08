import React from "react";
import { useState, useEffect } from "react";

import * as actions from '../action/action'
import { connect } from 'react-redux';

function OrderSummary(props) {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [charges, setCharges] = useState(0);
    const [cartTotal, setCarttotal] = useState(0);
    const [totalValue, setTotalValue] = useState(0);
    const [coup, setCoup] = useState(0);

    useEffect(() => {
        let items = 0;
        let price = 0;
        let charge = 0;
        let cart = 0;
        let discountAmount = 0;
        let coupoon = 0;

        props.Books.forEach((item) => {
            items += item.quantity * 1;
            discountAmount += item.price * item.quantity * (item.discount / 100);
            price += item.quantity * (item.price * (1 - (item.discount / 100)));
            charge += item.quantity * 10;
            cart += item.quantity * item.price + item.quantity * 10;
        });
        coupoon = localStorage.getItem('finalval');
        setCoup(coupoon);
        setTotalPrice(price);
        setTotalItems(items);
        setTotalDiscount(discountAmount);
        setCharges(charge);
        setCarttotal(cart);
        setTotalValue(totalPrice + charges);
        props.OrderSummary(totalValue);
        props.amount(Math.round(coup), props.userdetail.email);
    }, [
        props.Books,
        totalPrice,
        totalItems,
        totalDiscount,
        charges,
        cartTotal,
        totalValue
    ]);
    return (
        <div style={{ padding: "20px 0px 0px 20px" }}>
            <h5>subtotal items({totalItems})</h5>
            <h6 className="text-primary"><i>Yay you saved Rs.{Math.round(totalDiscount)}</i></h6>
            <h5>Total Rs.{Math.round(totalPrice)}</h5>
            <h5>Delivery Charges Rs.{charges}</h5>
            <hr></hr>


        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        Books: state.BookReducerCart.cart,
        amount: state.BookReducerCart.amount,
        userdetail: state.userLogin.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        OrderSummary: (totalValue) =>
            dispatch(actions.OrderSummaryAction(totalValue)
            ),
        amount: (cartTotal, useremail) => dispatch(actions.amountAction(cartTotal, useremail))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);