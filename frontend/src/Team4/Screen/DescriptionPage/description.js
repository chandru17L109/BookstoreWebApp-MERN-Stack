import React, { Component } from 'react'
import { FaHeart, FaStar } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import fiction2  from "../../images/fiction1.JPG"
import userpic  from "../../images/empty_avatar.png"
import ReviewPage from './review'
import * as actions from '../../action/action'
import {connect} from 'react-redux';

class ProductDetailspage extends Component {
  constructor(props){
    super(props);
    this.state = {bookdetails : props.location.query}
    console.log("props",props)
}

decidecartlist(bookid){
  if(!this.props.Email){
    alert("Please Login!")
    this.props.history.push('/login')
  }else{
    console.log("this.props.Email and bookid",this.props.Email.email, bookid)
    this.props.onAddcartlist(this.props.Email.email, bookid);
  }  
}

decidewishlist(bookid){
if(!this.props.Email){
    alert("Please Login!")
    this.props.history.push('/login')
  }else{
    console.log("this.props.Email and bookid",this.props.Email.email, bookid)
    this.props.onAddwishlist(this.props.Email.email, bookid);
  }
}

  render() {
    console.log("props bookdetail",this.state.bookdetails)
    return (
      <div style={{color:"black"}}>
        <div className="container mb-0" >
          <div className="row" >

            <div className="col-6 col-sm-6 col-md-2 col-lg-2 col-xl-2"> 
              <img className="card shadow rounded" src={fiction2} className="img-fluid" alt="product image"/>
            </div> 

            {/* <div className="col-md-7"> */}
            <div className="col-12 col-sm-10 col-md-6 col-lg-6 col-xl-7"> 
              <div>
                <strong style={{fontSize:"18px"}}>{this.state.bookdetails.title}</strong>
                <br></br>
                <strong style={{fontWeight:"normal"}}>{this.state.bookdetails.author} (Author)</strong>
                <br></br>
                <strong>
                  <i className="text-warning"><FaStar/></i>
                  <i className="text-warning"><FaStar/></i>
                  <i className="text-warning"><FaStar/></i>
                  <i className="text-warning"><FaStar/></i>
                  <i className="text-warning"><FaStar/></i>
                </strong>
                {/* <strong style={{marginLeft:"5px",fontWeight:"normal"}}>({this.state.bookdetails.ratings} Ratings)</strong> */}
                <strong style={{marginLeft:"5px",fontWeight:"normal"}}>(Ratings)</strong>
                <br></br>
                <div className="dropdown-divider mt-3"></div>
                {/* <strong className="text-danger" style={{fontSize:"16px"}}><span style={{color:"black"}}>Price - </span>Rs. {this.state.bookdetails.sellprice}/-</strong> */}
                <strong className="text-danger" style={{fontSize:"16px"}}><span style={{color:"black"}}>Price : </span>Rs. {Math.round(this.state.bookdetails.price - (this.state.bookdetails.price * this.state.bookdetails.discount/100))}/-</strong>
                <strong style={{marginLeft:"15px",textDecorationLine: 'line-through'}}>Rs. {this.state.bookdetails.price}</strong>
                <br></br>

                {/* <strong style={{fontSize:"14px"}}>
                  <span>You Save:</span>
                  <span className="text-primary font-weight-bold"><i className="fas fa-rupee-sign"></i> Rs. 4000/-</span>
                </strong> */}
                <strong style={{marginLeft:"5px",fontWeight:"normal"}}>({this.state.bookdetails.discount}% Discount)</strong>
                <div style={{marginTop:"10px"}}>
                  <strong >Available Offers</strong>
                  <br></br>
                  <strong style={{fontWeight:"normal",fontSize:"14px"}}>Bank Offer - ₹20 Off on first prepaid transaction using UPI payments, minimum order value ₹750/-</strong>
                  <br></br>
                  <strong style={{fontWeight:"normal",fontSize:"14px"}}>Bank Offer - ₹20 Off on first prepaid transaction using RuPay debit card, minimum order value ₹750/-</strong>
                  <br></br>
                  <strong style={{fontWeight:"normal",fontSize:"14px"}}>Combo Offer - Buy 2 Books save 5%;Buy 3 or more save 10% </strong> 
                  {/* <Link to='/booklist'><a style={{marginLeft:"7px",fontWeight:"bold"}}>See all Books</a></Link>  */}
                </div>
                <strong style={{fontSize:"14px",fontWeight:"normal"}}>Delivery - <span style={{fontWeight:"bold"}}>Expected within 5 working days</span> </strong>
                <br></br>
                <strong className="text-danger font-weight-bold"><span style={{color:"black"}}>Stock - </span>{this.state.bookdetails.available}</strong>
                <br></br>
                {/* <strong style={{fontSize:"15px"}}>Sold by:<a href="#"> abc Seller</a></strong> */}
              </div>
              <br></br>

              <div className="row">
                <div className="col-3 col-md-3">
                  <img src={fiction2} width="35" height="35" className="rounded" alt="" />
                  <br></br>
                  <a href="#">No contact delivery</a>
                </div>
                <div className="col-3 col-md-3">
                  <img src={fiction2} width="35" height="35" className="rounded" alt="" />
                  <br></br>
                  <a href="#">7 Day Replacement</a>
                </div>
                <div className="col-3 col-md-3">
                  <img src={fiction2} width="35" height="35" className="rounded" alt="" />
                  <br></br>
                  <a href="#">Amazon Delivered</a>
                </div>
                <div className="col-3 col-md-3">
                  <img src={fiction2} width="35" height="35" className="rounded" alt="" />
                  <br></br>
                  <a href="#">1 Year Waranty</a>
                </div>
              </div>
            </div>
                                      {/*card starts*/}
            <div className="col-12 col-sm-8 col-md-4 col-lg-4 col-xl-3 mt-2"> 
            <div className="card shadow rounded"  >
              <div className="card-body">
                <div className="form-group">
                  <strong> 
                    <span>M.R.P : </span>
                    <span style={{fontSize:"16px",textDecorationLine: 'line-through'}}>Rs.{this.state.bookdetails.price}/-</span>
                  </strong>
                  {/* <strong style={{marginLeft:"5px",textDecorationLine: 'line-through'}}>Rs. {this.state.bookdetails.price}</strong> */}
                  <br></br>
                  <strong>
                    <span>Price : </span>
                    <span className="text-danger font-weight-bold"><i className="fas fa-rupee-sign"></i> Rs. {Math.round(this.state.bookdetails.price - (this.state.bookdetails.price * this.state.bookdetails.discount/100))}</span>
                  </strong>
                  <br></br>
                  <strong style={{fontWeight:"normal"}}>Discount - ({this.state.bookdetails.discount}%)</strong>
                  <br></br>
                  {/* <strong>
                    <span>You Save:</span>
                    <span className="text-primary font-weight-bold"><i className="fas fa-rupee-sign"></i> Rs. 4000/-</span>
                    
                  </strong> */}
                  {/* <br></br> */}
                  <strong style={{fontWeight:"normal"}}>Inclusive of all taxes</strong>
                  <br></br>
                  <strong className="text-danger font-weight-bold"><span style={{color:"black"}}>Stock - </span>{this.state.bookdetails.available}</strong>
                  {/* <br></br> */}
                  {/* <strong style={{fontSize:"15px"}}>Sold by:<a href="#"> abc Seller</a></strong>
                  <br></br>
                  <label for="quantity">Quantity:</label>
                  <select className="form-control form-control-sm d-inline ml-2" style={{width: "50px"}} id="quantity">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>10</option>
                  </select> */}
                </div>
                {/* <a href="#" > */}
                  {/* <Link to = {'/login'}> */}
                <button class="btn btn-primary btn-sm btn-block mt-3 border-0" >
                  <i className="text-white " style={{fontSize:"20px"}} onClick={this.decidecartlist.bind(this,this.state.bookdetails._id)}><FaCartPlus/>    Add to Cart</i>
                </button>  
                {/* </Link> */}
                {/* </a> */}
                {/* <a href="#" > */}
                {/* <Link to = {'/login'}> */}
                  <button class="btn btn-primary btn-sm btn-block mt-3 border-0" >
                    <i className="text-white " style={{fontSize:"20px"}} onClick={this.decidewishlist.bind(this,this.state.bookdetails._id)}><FaHeart/>     Add to Wishlist</i>
                  </button>  
                  {/* </Link> */}
                {/* </a> */}
          
                <div className="dropdown-divider"></div>
                {/* <a href="#">
                  <i className="fas fa-map-marker-alt text-dark"></i>
                    Select Delivery Location
                </a> */}
              </div>
            </div>  
            </div>
          </div>

          <br></br><br></br>
                            {/*card ends*/}

          <div className="dropdown-divider md-4" style={{fontSize:"15px"}}></div>
          <div className="row border-bottom mt-3">
            <div className="col-md-12 my-3">
              <h6 className="font-weight-bold">Product description</h6>
                <p className="ml-3">{this.state.bookdetails.desc}</p>
            </div>
          </div>
          <div className="row border-bottom mt-3" style={{fontSize:"15px"}}>
            <div className="col-md-12 mt-3">
              <h6 className="font-weight-bold">Save Extra with 5 offers</h6>
              <ul>
                <li><span className="text-danger">No Cost EMI:</span> Avail No Cost EMI on select cards for orders above ₹3000</li>
                <li><span className="text-danger">Exchange Offer:</span> Enter your pincode to view Exchange offer</li>
                <li><span className="text-danger">Cashback (2):</span> 5% back with Amazon Pay ICICI Bank Credit card for
                        Prime-members. 3% back for everybody else. Here's how </li>
                <li><span className="text-danger">Bank Offer (2): </span> Get 5% up to Rs. 1500 Instant Discount on Bank of Baroda
                        Credit EMI transactions Here's how</li>
                <li><span className="text-danger">Partner Offers (3): </span> Buy now & pay next month at 0% interest or pay in
                        EMIs with Amazon Pay Later. Instant credit upto ₹20,000. Check eligibility here! Here's how </li>
              </ul>
            </div>
          </div>
          {/* <div style={{marginLeft:"5px"}}>
            <strong className="text-danger font-weight-bold"><span style={{color:"black"}}>Stock - </span>{this.state.bookdetails.stock}</strong>
            <br></br>
            <strong style={{fontSize:"15px"}}>Sold by:<a href="#"> abc Seller</a></strong>

          </div>    */}

        </div>
          
        {/* <div className="col-md-8" style={{marginLeft:"60px"}}> */}
        {/* <div className="col-md-8">
          <p className="text-capitalize font-weight-bold">Top reviews from India</p>
          <div className="row" >
            <div className="col-md-12">
              <a href="#" className="text-dark"><img src={userpic} width="34" height="34" className="rounded-circle mr-2"/> User1</a>
              <p className="font-weight-bold mt-2">
                <i className="text-warning"><FaStar/></i>
                <i className="text-warning"><FaStar/></i>
                <i className="text-warning"><FaStar/></i>
                <i className="text-warning"><FaStar/></i>
                <i className="text-warning"><FaStar/></i>
                Coimbatore
              </p>
              <p>
                hjkd sahdskahdjks hkdjhsjkfhsdkjfhk jdhfjkhjkf dhfs
                hjkd sahdskahdjks hkdjhsjkfhsdkjfhk jdhfjkhjkf dhfs
                hjkd sahdskahdjks hkdjhsjkfhsdkjfhk jdhfjkhjkf dhfs
                hjkd sahdskahdjks hkdjhsjkfhsdkjfhk jdhfjkhjkf dhfs
              </p>
            </div>
          </div>
            
          <div className="row">
            <div className="col-md-12">
              <a href="#" className="text-dark"><img src={userpic} width="34" height="34" className="rounded-circle mr-2"/> user2</a>
              <p className="font-weight-bold mt-2">
                <i className="text-warning"><FaStar/></i>
                <i className="text-warning"><FaStar/></i>
                <i className="text-warning"><FaStar/></i>
                <i className="text-warning"><FaStar/></i>
                <i className="text-warning"><FaStar/></i>
                Coimbatore
              </p>
              <p>
                hjkd sahdskahdjks hkdjhsjkfhsdkjfhk jdhfjkhjkf dhfs
                hjkd sahdskahdjks hkdjhsjkfhsdkjfhk jdhfjkhjkf dhfs
                hjkd sahdskahdjks hkdjhsjkfhsdkjfhk jdhfjkhjkf dhfs
                hjkd sahdskahdjks hkdjhsjkfhsdkjfhk jdhfjkhjkf dhfs
              </p>
            </div>
          </div>
            
          <div className="row">
            <div className="col-md-12">
              <a href="#" className="text-dark"><img src={userpic} width="34" height="34" className="rounded-circle mr-2"/> user3</a>
              <p className="font-weight-bold mt-2">
                <i className="text-warning"><FaStar/></i>
                <i className="text-warning"><FaStar/></i>
                <i className="text-warning"><FaStar/></i>
                <i className="text-warning"><FaStar/></i>
                <i className="text-warning"><FaStar/></i>
                Coimbatore
              </p>
              <p>
                hjkd sahdskahdjks hkdjhsjkfhsdkjfhk jdhfjkhjkf dhfs
                hjkd sahdskahdjks hkdjhsjkfhsdkjfhk jdhfjkhjkf dhfs
                hjkd sahdskahdjks hkdjhsjkfhsdkjfhk jdhfjkhjkf dhfs
                hjkd sahdskahdjks hkdjhsjkfhsdkjfhk jdhfjkhjkf dhfs
              </p>
            </div>
          </div>
            
          <div className="row">
            <div className="col-md-12">
              <a href="#" className="text-dark"><img src={userpic} width="34" height="34" className="rounded-circle mr-2"/> user4</a>
                <p className="font-weight-bold mt-2">
                  <i className="text-warning"><FaStar/></i>
                  <i className="text-warning"><FaStar/></i>
                  <i className="text-warning"><FaStar/></i>
                  <i className="text-warning"><FaStar/></i>
                  <i className="text-warning"><FaStar/></i>
                  Coimbatore
                </p>
                <p>
                  hjkd sahdskahdjks hkdjhsjkfhsdkjfhk jdhfjkhjkf dhfs
                  hjkd sahdskahdjks hkdjhsjkfhsdkjfhk jdhfjkhjkf dhfs
                  hjkd sahdskahdjks hkdjhsjkfhsdkjfhk jdhfjkhjkf dhfs
                  hjkd sahdskahdjks hkdjhsjkfhsdkjfhk jdhfjkhjkf dhfs
                </p>
              </div>
            </div>
             */}
          {/* <div className="dropdown-divider mt-3"></div>
          <a href="#" className="font-weight-bold">See all reviews <i className="fas fa-caret-right"></i></a>
           */}
        {/* </div>        */}

        <ReviewPage props={this.state.bookdetails}/>
     </div> 
        
);
}
}

const mapStateToProps = (state) => {
  console.log('Inside Component ', state);
  return {
      Email : state.userLogin.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onAddcartlist : (email,bookid) =>  dispatch(actions.Addtocartlist(email,bookid)),
      onAddwishlist : (email,bookid) =>  dispatch(actions.Addtowishlist(email,bookid)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailspage);