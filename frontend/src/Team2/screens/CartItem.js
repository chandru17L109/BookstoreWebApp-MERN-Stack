import react, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import * as actions from '../action/action'
import { connect } from 'react-redux';

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

const Item = (props) => {

    const [input, setInput] = useState(props.item.quantity)


    const onChangeHandler = (e) => {
        setInput(e.target.value);
        props.adjustQty(props.item._id, e.target.value, props.userdetail.email);
    };



    const move = (event) => {
        props.moveTo(props.item._id);
    };
    const del = (event) => {
        props.remove(props.item._id);
    }

    return (
        <>


            <ListGroup variant="flush">
                <ListGroupItem>
                    <Row>

                        <Col md={1} >
                            {/* <Link to={`/`}>
                                <Image src={props.item.imageUrl} fluid rounded />
                            </Link> */}
                        </Col>

                        <Col md={3} >
                            <Link to={`/`}>{props.item.title}   </Link>
                        </Col>

                        <Col md={2}>Rs {props.item.price}</Col>

                        <Col md={2}>
                            <input
                                min="1"
                                max={props.item.available}
                                type="number"
                                id="qty"
                                name="qty"
                                value={input}
                                onChange={onChangeHandler}
                            />
                        </Col>

                        <Col md={2} >
                            <Button onClick={move} type="button" className="btn btn-primary">
                                Move To Wishlist
                            </Button>
                        </Col>
                        <Col >
                            <Button onClick={del} type="button" className="btn btn-danger ml-5">
                                <i
                                    className="fa fa-trash "
                                    aria-hidden="true"
                                ></i>
                            </Button>
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>



        </>
    );
};


const mapStateToProps = (state) => {
    console.log('Inside', state);
    return {
        userdetail : state.userLogin.userInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        adjustQty: (_id, value, useremail) => dispatch(actions.adjustItemQty(_id, value, useremail)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
