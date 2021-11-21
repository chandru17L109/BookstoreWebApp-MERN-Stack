import react, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import * as actions from '../action/action'
import { connect } from 'react-redux';

import {
    Col,
    Button,
    Image,
} from "react-bootstrap";
import './CartItem.css';

import CustomizedSnackbars from '../../Team4/alert_notify/alert';

const Item = (props) => {

    const [price, setPrice] = useState(0)

    const [notify, setNotify] = useState(null)

    const xyz = (props.item.price) * (1 - (props.item.discount / 100))


    const onAdd = (event) => {
        props.onQuantityChange(props.item._id, props.userdetail.email, "add", props.item.available)
        if (props.item.quantity === props.item.available) {
            setNotify(<CustomizedSnackbars open={true} message={"Stock limit exceeded"} />)

            setTimeout(() => {
                setNotify(null)
            }, 2000)
        }
    }

    const onMinus = (event) => {
        props.onQuantityChange(props.item._id, props.userdetail.email, "minus", props.item.available)
    }

    const move = (event) => {
        props.moveTo(props.item._id);
    };
    const del = (event) => {
        props.remove(props.item._id);
    }

    return (
        <>
            <div className='cart-item-wrapper'>
                {notify}
                <div className="row ml-1">
                    <div className="col-2 col-sm-1 col-md-1 col-lg-1 col-xl-1 mb-1">
                        <Link to={`/`}>
                            <Image src={props.item.image} fluid rounded />
                        </Link>
                    </div>
                    <div className="col-5 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <span>{props.item.title}</span>
                    </div>
                    <div className="col-3 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <strong> Rs.{Math.round(xyz)}</strong>
                    </div>
                    <div className="col-5 col-sm-3 col-md-3 col-lg-3 col-xl-3 ">
                            <Button onClick={onMinus} className="ml-0 plusminuslistbtn">-</Button>
                            <Button className="ml-1 btn-info plusminuslistbtn" >{props.item.quantity} </Button>
                            <Button onClick={onAdd} className="ml-1 plusminuslistbtn">+</Button>
                    </div>
                    <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                        <div className='quantity-wrapper'>
                            <Button onClick={move} type="button" className="btn btn-warning wishlistbtn">
                                <span>Move To Wishlist</span>
                            </Button>
                            <Button onClick={del} type="button" className="btn btn-danger ml-1">
                                <i
                                    className="fa fa-trash "
                                    aria-hidden="true"
                                ></i>
                            </Button>
                        </div>
                        
                    </div>
                </div>
            </div>

        </>
    );
};


const mapStateToProps = (state) => {
    return {
        userdetail: state.userLogin.userInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onQuantityChange: (_id, useremail, QuantityChange, max) => dispatch(actions.onQuantityChangeAction(_id, useremail, QuantityChange, max)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
