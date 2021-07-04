import { FaHeart, FaStar } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import ReviewPage from './review'
import * as actions from '../../action/action'
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import AvgRating from '../AvgRating/AvgRating'

function ProductDetailspage(props) {

  const { match: { params } } = props;

  const [bookid, setBookid] = useState("")

  useEffect(() => {
      console.log("props",props.location.pathname);
      var findurl_bookid = (props.location.pathname).split('/')
      var book_id = findurl_bookid[findurl_bookid.length - 1]
      setBookid(book_id)
      props.onFetchBookDescription(book_id);
  },[props.location.pathname]);


const history = useHistory();

const decidecartlist = (bookid) =>{
  if(!props.Email){
        // alert("Please Login!")
        // history.push('/login');
        console.log("please login")
  }else{
    console.log("props.Email and bookid",props.Email.email, bookid)
    // props.onAddcartlist(props.Email.email, bookid);
  }  
}

const decidewishlist = (bookid) => {
if(!props.Email){
    // alert("Please Login!")
    // history.push('/login')
    console.log("please login")
  }else{
    console.log("this.props.Email and bookid",props.Email.email, bookid)
    // props.onAddwishlist(props.Email.email, bookid);
  }
}
  var booksreview = props.AvgReview;
          var Reviewfound = booksreview.findIndex(function(post, index) {
              if(post._id._id === props.Bookdetail._id)
                  return true;
          })
          
          var RatingValue = Reviewfound!== -1 ? booksreview[Reviewfound].average_ : "";
          console.log(Reviewfound)

    return (

      <div style={{color:"black"}}>
         { console.log("props bookdetail",props.Bookdetail)}

        <div className="container mb-0" >
          <div className="row" >

            <div className="col-6 col-sm-6 col-md-2 col-lg-2 col-xl-2"> 
              <img className="card shadow rounded" src={props.Bookdetail.image} className="img-fluid" alt="product image"/>
            </div> 

            {/* <div className="col-md-7"> */}
            <div className="col-12 col-sm-10 col-md-6 col-lg-6 col-xl-7"> 
              <div>
                <strong style={{fontSize:"18px"}}>{props.Bookdetail.title}</strong>
                <br></br>
                <strong style={{fontWeight:"normal"}}>{props.Bookdetail.authors} (Author)</strong>
                <br></br>
                <strong>
                <AvgRating rating={Math.round(RatingValue)}></AvgRating>
                </strong>
                {/* <strong style={{marginLeft:"5px",fontWeight:"normal"}}>({props.Bookdetail.ratings} Ratings)</strong> */}
                <strong style={{marginLeft:"5px",fontWeight:"normal"}}>(Ratings)</strong>
                <br></br>
                <div className="dropdown-divider mt-3"></div>
                {/* <strong className="text-danger" style={{fontSize:"16px"}}><span style={{color:"black"}}>Price - </span>Rs. {props.Bookdetail.sellprice}/-</strong> */}
                <strong className="text-danger" style={{fontSize:"16px"}}><span style={{color:"black"}}>Price : </span>Rs. {Math.round(props.Bookdetail.price - (props.Bookdetail.price * props.Bookdetail.discount/100))}/-</strong>
                <strong style={{marginLeft:"15px",textDecorationLine: 'line-through'}}>Rs. {props.Bookdetail.price}</strong>
                <br></br>

                {/* <strong style={{fontSize:"14px"}}>
                  <span>You Save:</span>
                  <span className="text-primary font-weight-bold"><i className="fas fa-rupee-sign"></i> Rs. 4000/-</span>
                </strong> */}
                <strong style={{marginLeft:"5px",fontWeight:"normal"}}>({props.Bookdetail.discount}% Discount)</strong>
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
                <strong className="text-danger font-weight-bold"><span style={{color:"black"}}>Stock - </span>{props.Bookdetail.available >0 ? "Available" : "Not Available"}</strong>
                <br></br>
                {/* <strong style={{fontSize:"15px"}}>Sold by:<a href="#"> abc Seller</a></strong> */}
              </div>
              <br></br>

              <div className="row">
                <div className="col-3 col-md-3">
                  <img src={props.Bookdetail.image} width="35" height="35" className="rounded" alt="" />
                  <br></br>
                  <a href="#">No contact delivery</a>
                </div>
                <div className="col-3 col-md-3">
                  <img src={props.Bookdetail.image} width="35" height="35" className="rounded" alt="" />
                  <br></br>
                  <a href="#">7 Day Replacement</a>
                </div>
                <div className="col-3 col-md-3">
                  <img src={props.Bookdetail.image} width="35" height="35" className="rounded" alt="" />
                  <br></br>
                  <a href="#">Bookstore Delivered</a>
                </div>
                {/* <div className="col-3 col-md-3">
                  <img src={fiction2} width="35" height="35" className="rounded" alt="" />
                  <br></br>
                  <a href="#">1 Year Waranty</a>
                </div> */}
              </div>
            </div>
                                      {/*card starts*/}
            <div className="col-12 col-sm-8 col-md-4 col-lg-4 col-xl-3 mt-2"> 
            <div className="card shadow rounded"  >
              <div className="card-body">
                <div className="form-group">
                  <strong> 
                    <span>M.R.P : </span>
                    <span style={{fontSize:"16px",textDecorationLine: 'line-through'}}>Rs.{props.Bookdetail.price}/-</span>
                  </strong>
                  {/* <strong style={{marginLeft:"5px",textDecorationLine: 'line-through'}}>Rs. {props.Bookdetail.price}</strong> */}
                  <br></br>
                  <strong>
                    <span>Price : </span>
                    <span className="text-danger font-weight-bold"><i className="fas fa-rupee-sign"></i> Rs. {Math.round(props.Bookdetail.price - (props.Bookdetail.price * props.Bookdetail.discount/100))}</span>
                  </strong>
                  <br></br>
                  <strong style={{fontWeight:"normal"}}>Discount - ({props.Bookdetail.discount}%)</strong>
                  <br></br>
                  {/* <strong>
                    <span>You Save:</span>
                    <span className="text-primary font-weight-bold"><i className="fas fa-rupee-sign"></i> Rs. 4000/-</span>
                    
                  </strong> */}
                  {/* <br></br> */}
                  <strong style={{fontWeight:"normal"}}>Inclusive of all taxes</strong>
                  <br></br>
                  <strong className="text-danger font-weight-bold"><span style={{color:"black"}}>Stock - </span>{props.Bookdetail.available >0 ? "Available" : "Not Available"}</strong>
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
                  <i className="text-white " style={{fontSize:"20px"}} onClick={decidecartlist(bookid)}><FaCartPlus/>    Add to Cart</i>
                </button>  
                {/* </Link> */}
                {/* </a> */}
                {/* <a href="#" > */}
                {/* <Link to = {'/login'}> */}
                  <button class="btn btn-primary btn-sm btn-block mt-3 border-0" >
                    <i className="text-white " style={{fontSize:"20px"}} onClick={decidewishlist(bookid)}><FaHeart/>     Add to Wishlist</i>
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
                <p className="ml-3"> </p>
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
        </div>
        <ReviewPage props={props.Bookdetail}/>
     </div> 
        
);
}

const mapStateToProps = (state) => {
  console.log('Inside Component ', state);
  return {
      Email : state.userLogin.userInfo,
      Bookdetail : state.BookReducer.bookdetail,
      AvgReview : state.BookReducer.avgreview,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onAddcartlist : (email,bookid) =>  dispatch(actions.Addtocartlist(email,bookid)),
      onAddwishlist : (email,bookid) =>  dispatch(actions.Addtowishlist(email,bookid)),
      onFetchBookDescription : (bookid) => dispatch(actions.FetchBookDescription(bookid)),
      OnAvgreview : () => dispatch(actions.FetchAverageReview())

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailspage);