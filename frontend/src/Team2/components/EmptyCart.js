import React, { Component } from 'react'
import { Link } from "react-router-dom";
import HomeScreen from '../screens/HomeScreen';
import {
    Row,
    Col,
    Form,
    Button,
    Card,
    Image,
    ListGroup,
    ListGroupItem,
    FormControl, Container
} from "react-bootstrap";


export default class EmptyCart extends Component {
    render() {
        return (
            <div>
                <h4>Your cart is Empty <Link>Home</Link> </h4>
                <hr></hr>
                <Container>
                    <h6>Books You May Like</h6>
                    <HomeScreen />
                </Container>

            </div>
        )
    }
}

