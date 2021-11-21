import React from "react";
import { useState, useEffect } from "react";

import * as actions from '../action/action'
import { connect } from 'react-redux';
import OrderSummary from "./OrderSummary";

function Coupon(props) {
    const [cc, setCc] = useState("");
    const [scc, setScc] = useState("jkllj");
    const [disable, setDisable] = useState(true);
    const [dis, setDis] = useState(true);



    useEffect(() => {
        applycoupon(scc);

    }, [props.OrderSummary.totalValue], couponvalue);

    var showcoupon = false;
    var showms = false;
    var showms2 = false;
    var percent = -10;
    var minreq = 0;
    var couponvalue = 0;

    var tot = props.OrderSummary.totalValue;
    var valid = "tf";

    if (props.Disc != null) {
        percent = props.Disc.offeramount;
        minreq = props.Disc.minamount;
        valid = props.Disc.activeornot;
    }

    if (valid == true) {
        if (tot >= minreq) {

            couponvalue = Math.round((percent) * tot / 100);
            showcoupon = true;
            localStorage.setItem('couponvalue', couponvalue);

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
    var xyz = Math.round(props.OrderSummary.totalValue - couponvalue);
    localStorage.setItem('finalval', xyz);


    const applycoupon = (cc) => {

        if (cc == "jkllj") {

            showms = false;
            setDisable(false);
            props.onApplycoupon(cc);

        }
        else {
            props.onApplycoupon(cc);
            setDisable(true);
            setDis(false);
        }
    }

    const onChangeHandler = (e) => {
        setCc(e.target.value);
        if (e.target.value == "") {
            setDisable(true)
        }
        else {
            setDisable(false)
        }
    };

    return (
        <div>


            <form >
                <input className="form-control form-control-lg" type="text" id="cp" name="cppp" onChange={onChangeHandler} placeholder="coupon code" maxlength="6"/>
                <div className="ml-3 text-secondary">
                    <span>Try FLAT40 Coupon</span>
                </div>
                {showms ? <h5 className="ml-3 text-secondary">minimum cart value required is {minreq}</h5> : null}
                {showms2 ? <h5 className="ml-3 text-secondary">coupon code is invalid </h5> : null}
                <br></br>
                <button disabled={disable} onClick={() => applycoupon(cc)} type="button" className="btn btn-warning ml-3">
                    apply coupon
                </button>

            </form>

            {showcoupon ? <div ><h5 className="ml-3">coupon applied:{couponvalue}</h5><button disabled={dis} onClick={() => applycoupon(scc)} type="button" className="btn btn-warning ml-3">{cc} <i
                className="fa fa-trash "
                aria-hidden="true"
            ></i></button></div> : null}
            <hr></hr>
            <OrderSummary />

            <h5 className="text-Primary">Cart Total:{Math.round(xyz)}</h5>
        </div>
    )
}




const mapStateToProps = (state) => {
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