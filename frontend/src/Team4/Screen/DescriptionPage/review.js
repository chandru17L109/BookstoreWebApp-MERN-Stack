import React, { Component } from 'react'
import { FaHeart, FaStar } from "react-icons/fa";
import { Navbar, Nav, FormControl, Form, Button } from 'react-bootstrap';
import { FaCartPlus } from "react-icons/fa";
import * as actions from '../../action/action'
import {connect} from 'react-redux';

export default class ReviewPage extends Component {
  constructor(props){
    super(props);
    this.state = {bookdetails : props}
    console.log("props",props)
   }   
        
    render() {
    console.log("props bookdetail",this.state.bookdetails)
    return (
        <div className="row m-3">
        <div className="col-12 col-sm-8 col-md-7 col-lg-7 col-xl-8 mt-2">
            <h1>hello</h1>
        </div>

        <div className="col-12 col-sm-8 col-md-4 col-lg-4 col-xl-3 mt-2"> 
            <div className="card shadow rounded">
              <div className="card-body">
                <div className="form-group">
                 <button class="btn btn-info btn-sm btn-block mb-3 py-3 border-0" disabled>
                     <small className="text-white " style={{fontSize:"25px"}} >Review and Rating</small>
                 </button>    
                  <strong className="ml-3"> 
                    Ratings
                  </strong>
                  <select className="form-control form-control-sm d-inline ml-2"  style={{width: "100px"}} id="ratings">
                    <option selected>Choose...</option>
                        <option value="5">Excellent</option>
                        <option value="4">Very Good</option>
                        <option value="3">Good</option>
                        <option value="2">Average</option>
                        <option value="1">Bad</option>
                  </select>
                </div>

                <Form>
                    <p className="m-3 "> Comment </p>
                    <FormControl type="text"/>
                </Form>
            
                <button class="btn btn-primary btn-sm btn-block mt-3 border-0" >
                  <i className="text-white " style={{fontSize:"15px"}} >  Add Review</i>
                  {/* <i className="text-white " style={{fontSize:"20px"}} onClick={this.decidecartlist.bind(this,this.state.bookdetails._id)}><FaCartPlus/>    Add to Cart</i> */}
                </button>            
               </div>  
            
               </div>
            </div>
        </div>
    )
    }

}
