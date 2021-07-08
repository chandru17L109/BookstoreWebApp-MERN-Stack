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
                <Col md={1} >
                    <Link to={`/`}>
                        <Image src={props.item.image} fluid rounded />
                    </Link>
                </Col>

                <Col md={2} >
                    <Link to={`/`}>{props.item.title}   </Link>
                </Col>

                <Col md={2}>Rs.{Math.round(xyz)}</Col>
                <div className='quantity-wrapper'>
                    <Col md={1}>
                        <div onClick={onMinus}>
                            <Button>-</Button>
                        </div>
                    </Col>
                    <Col md={1}>
                        <p>{props.item.quantity}</p>
                    </Col>
                    <Col md={1}>
                        <div onClick={onAdd}>
                            <Button>+</Button>
                        </div>
                    </Col>
                </div>
                <div>
                    <Col md={2} >
                        <Button onClick={move} type="button" className="btn btn-primary mr-5">
                            Move To Wishlist
                        </Button>
                    </Col>
                </div>
                <div>
                    <Col >
                        <Button onClick={del} type="button" className="btn btn-danger ml-5">
                            <i
                                className="fa fa-trash "
                                aria-hidden="true"
                            ></i>
                        </Button>
                    </Col>
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
