import React, { Component } from 'react'
import  '../../Styles/footer.css';
// import {Link} from "react-router-dom";

export default class Footer extends Component {
    render() {
    return (
        <div>
            <div className="container-fluid bg-primary px-0">
                {/* <Link to =  {'/'} className="btn btn-dark btn-block mb-5">Back to Top</Link> */}
                <a href = "/"  className="btn btn-light btn-block mb-5">Back to Top </a> 

 
                <div className="container">
                <div className="row text-white mb-5">

                    <div className="col-md-3">
                    <h5>Get to know us</h5>
                    <a href="/" className="text-white">About</a> <br />
                    <a href="/" className="text-white">Careers</a> <br />
                    <a href="/" className="text-white">Press Release</a> <br />
                    <a href="/" className="text-white">Investment</a> <br />
                    <a href="/" className="text-white">Offers</a> <br />
                    </div>

                    <div className="col-md-3">
                        <h5>Connect With Us</h5>
                        <a href="/" className="text-white">Facebook</a> <br />
                        <a href="/" className="text-white">Twitter</a> <br />
                        <a href="/" className="text-white">Instagram</a> <br />
                        </div>

                        <div class="col-md-3">
                        <h5>Make Money With Us</h5>
                        <a href="/" className="text-white">Sell on Bookstore</a> <br />
                        <a href="/" className="text-white">Affiliate Marketing</a> <br />
                        <a href="/" className="text-white">Fullfilment Center</a> <br />
                        <a href="/" className="text-white">Advertise Your Product</a> <br />
                        <a href="/" className="text-white">Bookstore Pay</a> <br />
                        </div>

                        <div class="col-md-3">
                        <h5>Let Us Help You</h5>
                        <a href="/" className="text-white">COVID 19</a> <br />
                        <a href="/" className="text-white">Your Account</a> <br />
                        <a href="/" className="text-white">Returns</a> <br />
                        <a href="/" className="text-white">Funding</a> <br />
                        <a href="/" className="text-white">Help</a> <br />
                        </div>

                    </div>
                </div>

                <div className="dropdown-divider mt-3"></div>

                {/* <div className="row mt-3 mx-0 px-0">

                <div class="col-md-12 text-center">
                    <img src="./image/Bookstore_logo_white.png"  height="30" width="100" alt="Bookstore logo white footer"></img>
                </div>
                </div> */}
 



            <div className="bottom bg-primary">
                <div className="container">

                    <div className="row pt-5 text-white">

                    <div className="col-md-3">
                        <h6 className="text-white" >AbeBooks</h6>
                        <a href="/" className="text-white">Books, art</a> <br />
                        <a href="/" className="text-white">and collections</a> <br />
                    
                    </div>

                    

                    <div className="col-md-3">
                        <h6>Bookstore Web Services</h6>
                        <a href="/" className="text-white">Bookstore Web Services</a> <br />
                        <a href="/" className="text-white">Scalable Cloud</a> <br />
                        
                        
                    </div>

                    <div className="col-md-3">
                        <h6>Audible</h6>
                        <a href="/" className="text-white">Audio Books</a> <br />
                        <a href="/" className="text-white">Download</a> <br />
                        
                        
                    </div>
                    <div className="col-md-3">
                        <h6>Let Us Help You</h6>
                        <a href="/" className="text-white">DPReview</a> <br />
                        <a href="/" className="text-white">Digital</a> <br />
                        
                        
                    </div><br></br><br></br>
                    <div className="col-md-3 mt-3">
                        <h6>Shopbop</h6>
                        <a href="/" className="text-white">Designer</a> <br />
                        <a href="/" className="text-white">Fashion Brands</a> <br />
                        
                        
                    </div>
                    <div className="col-md-3 mt-3">
                        <h6>Bookstore Business</h6>
                        <a href="/" className="text-white">Everything For</a> <br />
                        <a href="/" className="text-white">Your Business</a> <br />
                        
                    </div>
                    <div className="col-md-3 mt-3">
                        <h6>Prime Now</h6>
                        <a href="/" className="text-white">2-Hour Delivery</a> <br />
                        <a href="/" className="text-white">on Everyday Items</a> <br />
                
                        
                    </div>
                    <div className="col-md-3 mt-3">
                        <h6>Bookstore Prime Music</h6>
                        <a href="/" className="text-white">70 million songs, ad-free</a> <br />
                        <a href="/" className="text-white">Over 9 million podcast episodes</a> <br />
                        
                        
                    </div>

                </div>
                    <div className="row mt-5 mt-3">
                        <div className="col-md-12 text-center text-white">
                            <p><i className="far fa-copyright"></i> 1996-2020, Bookstore.com Inc.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )}
}