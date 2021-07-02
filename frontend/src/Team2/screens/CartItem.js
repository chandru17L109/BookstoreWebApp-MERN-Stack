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

const Item = ({ item, adjustQty, moveTo, remove }) => {



    const [input, setInput] = useState(item.quantity)


    const onChangeHandler = (e) => {
        setInput(e.target.value);
        adjustQty(item._id, e.target.value);
    };



    const move = (event) => {
        moveTo(item._id);
    };
    const del = (event) => {
        remove(item._id);
    }

    return (
        <>


            <ListGroup variant="flush">
                <ListGroupItem>
                    <Row>

                        <Col md={1} >
                            {/* <Link to={`/`}>
                                <Image src={item.imageUrl} fluid rounded />
                            </Link> */}
                        </Col>

                        <Col md={3} >
                            <Link to={`/`}>{item.title}   </Link>
                        </Col>

                        <Col md={1}>${item.price}</Col>

                        <Col md="1">
                            <input
                                min="1"
                                max={item.available}
                                type="number"
                                id="qty"
                                name="qty"
                                value={input}
                                onChange={onChangeHandler}
                            />
                        </Col>

                        <Col md={1} >
                            <Button onClick={move} type="button" className="btn btn-primary">
                                Move To Wishlist
                            </Button>
                        </Col>
                        <Col >
                            <Button onClick={del} type="button" className="btn btn-danger">
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


const mapDispatchToProps = (dispatch) => {
    return {
        adjustQty: (_id, value) => dispatch(actions.adjustItemQty(_id, value)),
    };
};

export default connect(null, mapDispatchToProps)(Item);
