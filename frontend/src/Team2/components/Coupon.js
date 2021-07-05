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
import OrderSummary from "./OrderSummary";

function Coupon(props) {
    //const [showcoupon, setShowcoupon]=useState(false);
    const [cc, setCc] = useState("");
    const [scc, setScc] = useState("jkllj");
    //const [offer, setOffer]=useState(0);
    const [disable, setDisable] = useState(true);
    const [dis, setDis] = useState(true);


    console.log("afs", props.amount);

    useEffect(() => {
        applycoupon(scc);

    }, [props.amount]);

    var showcoupon = false;
    var showms = false;
    var showms2 = false;
    var percent = -10;
    var minreq = 0;
    var couponvalue = 0;
    var tot = props.amount;
    var valid = "tf";
    if (props.Disc != null) {
        percent = props.Disc.offeramount;
        minreq = props.Disc.minamount;
        valid = props.Disc.activeornot;
    }

    if (valid == true) {
        if (tot >= minreq) {
            showcoupon = true;
            couponvalue = Math.round((percent) * tot / 100);

            // props.couponAmount(tot - couponvalue, props.userdetail.email);
            console.log("status", showcoupon)
        }
        else {
            showms = true;
        }

    }
    else if (valid == false) {
        showms2 = true;
    }
    else {

    }



    const applycoupon = (cc) => {

        if (cc == "jkllj") {
            console.log("code entered", cc);
            showms = false;
            setDisable(false);
            props.onApplycoupon(cc);

        }
        else {
            props.onApplycoupon(cc);
            setDisable(true);
            setDis(false);
        }
        console.log("coupon value", couponvalue)
    }

    const onChangeHandler = (e) => {
        console.log("code enterin", e.target.value);
        setCc(e.target.value);
        if (e.target.value == "") {
            setDisable(true)
        }
        else {
            setDisable(false)
        }
    };
    const xyz = props.amount - couponvalue;
    return (
        <div>

            {/* <h5>
                subtotal items({props.OrderSummary.totalItems})
            </h5>
            <h5>Total:${props.OrderSummary.totalPrice}</h5>
            <h5>Delivery Charges:{props.OrderSummary.charges}</h5> */}
            <form >
                <input type="text" id="cp" name="cppp" onChange={onChangeHandler} placeholder="coupon code" maxlength="6" />
                {showms ? <h5>minimum cart value required is {minreq}</h5> : null}
                {showms2 ? <h5>coupon code is invalid </h5> : null}
                <button disabled={disable} onClick={() => applycoupon(cc)} type="button" className="btn btn-warning">
                    apply coupon
                </button>

            </form>

            {showcoupon ? <div ><h5>coupon applied:{couponvalue}</h5><button disabled={dis} onClick={() => applycoupon(scc)} type="button" className="btn btn-warning">cancel coupon</button></div> : null}
            <hr></hr>
            <OrderSummary />

            <h5>Cart Total:{Math.round(xyz)}</h5>
        </div>
    )
}




const mapStateToProps = (state) => {
    console.log('Inside', state);
    return {
        OrderSummary: state.BookReducerCart.orderSummary,
        amount: state.BookReducerCart.amount,
        Disc: state.BookReducerCart.coupon,
        userdetail: state.userLogin.userInfo

    }
}
const mapDispatchToProps = (dispatch) => {
    return {


        onApplycoupon: (code) =>
            dispatch(actions.onApplycouponAction(code)),
        couponAmount: (cartTotal, useremail) => dispatch(actions.amountAction(cartTotal, useremail))


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Coupon);