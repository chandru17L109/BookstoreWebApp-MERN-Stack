import React, { Component } from 'react'
import {Card} from 'react-bootstrap' 
// import fiction2  from "../../../../images/nonfic3.JPG"
import { FaCartPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa"
// import { FaStar } from "react-icons/fa"
import {Link} from "react-router-dom";
import '../../../../Styles/design.css';
import '../../../../Styles/commonStyling.css'

import * as actions from '../../../../action/action'
// import React, { useEffect } from 'react'
import {connect} from 'react-redux';

import CustomizedSnackbars from '../../../../alert_notify/alert';
import AvgRating from '../../../AvgRating/AvgRating'



class NewRelease extends Component {

    constructor(props){
        super(props);
        this.state = {newrelease : [], newreleasequery:"sort=-date&limit=6",notify: null}
    }


    componentDidMount(){
        this.props.onFetchNewReleaseBooks(this.state.newreleasequery);
        this.props.OnAvgreview();
    }

    decidecartlist(bookid){
        if(!this.props.Email){
            this.setState({notify: <CustomizedSnackbars open={true} message={"Please Login to continue !"}/>})
            setTimeout(()=>{
                this.setState({notify:null})
            },2000)
          //   this.props.props.history.push('/login')
          }else{
            this.setState({notify: <CustomizedSnackbars open={true} message={"Item successfully added to the Cart !"}/>})
            setTimeout(()=>{
              this.setState({notify:null})
            },2000)
            this.props.onAddcartlist(this.props.Email.email, bookid);
          }  
    }

    decidewishlist(bookid){
        if(!this.props.Email){
            this.setState({notify: <CustomizedSnackbars open={true} message={"Please Login to continue !"}/>})
              setTimeout(()=>{
                  this.setState({notify:null})
              },2000)
            }else{
            this.setState({notify: <CustomizedSnackbars open={true} message={"Item successfully added to the WishList !"}/>})
              setTimeout(()=>{
                this.setState({notify:null})
              },2000)
              this.props.onAddwishlist(this.props.Email.email, bookid);
            }
  }

    render() {
        var newreleaselist = this.props.newreleaseBooks.map((books, i)=>{
            var booksreview = this.props.AvgReview;
            console.log("booksreview",booksreview);
                // eslint-disable-next-line
            var Reviewfound = booksreview.findIndex(function(post, index) {
                if(post._id._id === books._id)
                    return true;
            })
            var RatingValue = Reviewfound!== -1 ? booksreview[Reviewfound].average_ : "";
            console.log(Reviewfound)
            return(
                <div className="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 cardmarign" key={i}>
                    
                    <Card className="card-top border-0 mb-4 card shadow rounded Cardshover">
                        
                        <Link to = {'/description/'+books._id}>
                            <Card.Img className="card-header leftpaddingcard bg-white" src={books.image} variant="top" />
                        </Link>
                        
                        <Card.Body className="card-body leftpaddingcarddata change-font text-dark" >
                            <Card.Text as="div" className="cardtext">

                                <div className="text-dark">
                                    <strong >{books.title}</strong>
                                    <br></br>
                                    <strong style={{fontWeight:"normal"}}>{books.authors}</strong>
                                </div>
                                   
                                <strong style={{ textDecorationLine: 'line-through' }}>Rs. {books.price}</strong>
                                <strong style={{marginLeft:"7px",color:"red"}}>Rs.{Math.round(books.price - (books.price * books.discount/100))}</strong>

                                <div>
                                    <strong style={{float:"left"}} variant="link">
                                    <AvgRating rating={Math.round(RatingValue)}></AvgRating>
                                    </strong>
                                    <strong style={{marginLeft:"10px"}}>({books.discount}%)</strong>
                                </div>

                                <div className="aligncartwishlist">
                                    <button class="btn btn-light border-0 cartbutton"  onClick={this.decidecartlist.bind(this,books._id)}>
                                        <i className="text-primary "><FaCartPlus/></i>
                                    </button>
                                    <button class="btn btn-light border-0 wishlistbutton"  onClick={this.decidewishlist.bind(this,books._id)}>
                                        <i className="text-danger "><FaHeart/></i>
                                    </button> 
                                </div>                               

                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            )
        })
        
        return (
            <>
            {this.state.notify}
                {newreleaselist}    
            </>
        )
    }
}

  
  const mapStateToProps = (state) => {
    console.log('Inside Component ', state);
    return {
        newreleaseBooks: state.BookReducer.homepagenewrelease,
        Email : state.userLogin.userInfo,
        AvgReview : state.BookReducer.avgreview,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        onFetchNewReleaseBooks: (condition_popular)=> dispatch(actions.fetchbooksHomepagenewrelease(condition_popular)),
        onAddcartlist : (email,bookid) =>  dispatch(actions.Addtocartlist(email,bookid)),
        onAddwishlist : (email,bookid) =>  dispatch(actions.Addtowishlist(email,bookid)),
        OnAvgreview : () => dispatch(actions.FetchAverageReview())
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(NewRelease);

// fetch('http://localhost:4000'+'/books/?sort=-date',{
//     headers:{'content-type': 'application/json'},
// })
// .then(res=>res.json())
// .then(data=>{
//     this.setState({newrelease : data.data})
// });
// console.log("alldeals",this.state.newrelease)