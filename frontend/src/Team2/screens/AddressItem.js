import React from "react";
import { Link } from "react-router-dom";
import * as actions from "../action/action";
import { connect } from "react-redux";
import './AddressItem.css'

import {
    Row,
    Col,
    ListGroup,
    ListGroupItem,
} from "react-bootstrap";

function Item1(props) {
    const editaddress = () => {
        props.editaddress(props.arr._id, props.arr);
        props.Setadd(false);
    };

    const deladdress = (event) => {
        props.delete(props.arr._id);
    };

    const deliverToAddress = () => {
        props.OndeliverToAddress(props.arr._id, props.arr);
    };

    return (
        <Row >
            <Col md={10}>
                <ListGroup variant="flush" style={{ boxShadow: "5px 3px 5px 3px " }}>
                    <ListGroupItem>
                        <Row >

                            <Col md={1}>
                                <div class="form-check" >
                                    <label class="form-check-label">
                                        <input
                                            className="form-check-input" name="optionsRadios" id="optionsRadios1"
                                            type="radio"
                                            value={props.arr._id}
                                            checked={props.radio == props.arr._id}
                                            onChange={(e) => {
                                                props.setRadio(() => {

                                                    return e.target.value;
                                                });
                                            }}
                                        ></input>
                                    </label>
                                </div>
                            </Col>

                            <Col>
                                <p className="name" style={{ color: "black" }}>
                                    {props.arr.name},
                                </p>
                                <p>{props.arr.houseNumber}</p>

                                <p>
                                    {props.arr.locality},{props.arr.phone}
                                </p>

                                {props.arr.city ? (
                                    <p>
                                        {props.arr.city} ,{props.arr.pinCode}
                                    </p>
                                ) : (
                                    <p>{props.arr.pinCode}</p>
                                )}

                                {props.arr.state ? (
                                    <p>{props.arr.state}, India</p>
                                ) : (
                                    <p>India</p>
                                )}
                            </Col>
                        </Row>
                        <Row>

                            {props.radio == props.arr._id ? (
                                <div className="button-div">
                                    <Link to="/payment">
                                        <button
                                            type="button"
                                            className="btn btn-primary deliver"
                                            onClick={deliverToAddress}
                                        >
                                            Deliver to this address
                                        </button>
                                        &nbsp;&nbsp;
                                    </Link>
                                    <div className='button-wrapper'>
                                        <button
                                            type="button"
                                            class="btn btn-danger delete"
                                            onClick={deladdress}
                                        >
                                            Delete address
                                        </button>
                                    </div>
                                    &nbsp;&nbsp;
                                    <div className='button-wrapper'>
                                        <button
                                            type="button"
                                            class="btn btn-warning edit"
                                            onClick={editaddress}
                                        >
                                            Edit Address
                                        </button>
                                    </div>
                                </div>

                            ) : (

                                <header></header>
                            )}
                        </Row>
                    </ListGroupItem>
                </ListGroup>
            </Col>
        </Row>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        OndeliverToAddress: (id, arr) =>
            dispatch(actions.OndeliverToAddressAction(id, arr)),
    };
};

export default connect(null, mapDispatchToProps)(Item1);
