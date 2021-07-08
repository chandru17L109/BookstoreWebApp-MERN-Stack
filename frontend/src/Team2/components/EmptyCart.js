import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class EmptyCart extends Component {
    render() {
        return (
            <div>
                <h4 className="ml-4">Your cart is Empty <Link to  = {"/"} className="text-primary">Home</Link> </h4>
                <hr></hr>
            </div>
        )
    }
}

