import React, { Component } from 'react'
// import { FaHeart, FaStar } from "react-icons/fa";
import { FormControl, Form} from 'react-bootstrap';
// import { FaCartPlus } from "react-icons/fa";
import * as actions from '../../action/action'
import {connect} from 'react-redux';
import CustomizedSnackbars from '../../alert_notify/alert';

class ReviewPage extends Component {
  constructor(props){
    super(props);
    this.state = {bookdetails : props, comment:"",rating:"",notify: null}
   }   

   componentDidMount(){
    this.props.onFetchBookReviews(this.state.bookdetails.props._id);
  }

  Comment(event) {
    let commentdata = event.target.value;
    this.setState({comment : commentdata})
  }

  Rating(event) {
    let rating_ = event.target.value;
    this.setState({rating : rating_})
  }

   AddReview(){
        if(!this.props.User){
          this.setState({notify: <CustomizedSnackbars open={true} message={"Please Login to continue !"}/>})
          setTimeout(()=>{
              this.setState({notify:null})
          },2000)
          this.setState({rating:"",comment:""})
        }else{
          setTimeout(()=>{
            this.setState({notify:null})
          },2000)
          this.props.onAddReview(this.state.rating, this.state.comment, this.props.User.name, this.state.bookdetails.props._id);
          this.setState({notify: <CustomizedSnackbars open={true} message={"Review Added !"}/>})
          this.setState({rating:"",comment:""})
          this.props.onFetchBookReviews(this.state.bookdetails.props._id);
        }  
    }
        
    render() {
      console.log("this.props.Bookreview",this.props.Bookreview)
      var BookreviewData = this.props.Bookreview
      if(BookreviewData.length === 0){
        var reviewsList = "No reviews available"
      }else{
        var reviewsList = BookreviewData.data.map((books, i)=>{
          return(
            <>
              <strong>{books.user}</strong><br></br>
              <strong>Rating : </strong> {books.rating} <br></br>
              <strong>Comment :</strong>
              <span>{books.comment}</span><br></br><br></br>
            </>
          )
        })
      }
      
      

    return (
        <div className="row m-3">
        {this.state.notify}
        <div className="col-12 col-sm-8 col-md-7 col-lg-7 col-xl-8 mt-2">
          <h3>User Reviews</h3>
        {reviewsList}
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-2"> 
            <div className="card shadow rounded">
              <div className="card-body">
                <div className="form-group">
                 <button class="btn btn-info btn-sm btn-block mb-3 py-3 border-0" disabled>
                     <small className="text-white " style={{fontSize:"20px"}} >Review and Rating</small>
                 </button>    
                  <strong className="ml-3"> 
                    Ratings
                  </strong>

                  <select className="form-control form-control-sm d-inline ml-2" onChange={this.Rating.bind(this)} value={this.state.rating} style={{width: "100px"}} id="ratings">
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
                    <FormControl type="text" onChange={this.Comment.bind(this)} value={this.state.comment}/>
                </Form>
            
                <button class="btn btn-primary btn-sm btn-block mt-3 border-0" >
                  <i className="text-white " style={{fontSize:"15px"}} onClick={this.AddReview.bind(this)}>  Add Review</i>
                  {/* <i className="text-white " style={{fontSize:"20px"}} onClick={this.decidecartlist.bind(this,this.state.bookdetails._id)}><FaCartPlus/>    Add to Cart</i> */}
                </button>            
               </div>  
            
               </div>
            </div>
        </div>
    )
    }

}

const mapStateToProps = (state) => {
  console.log('Inside Component ', state);
  return {
      User : state.userLogin.userInfo,
      Bookreview : state.BookReducer.review,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onAddReview : (rating,comment,username,bookid) =>  dispatch(actions.AddReview(rating,comment,username,bookid)),
      onFetchBookReviews : (bookid) => dispatch(actions.FetchReview(bookid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPage);