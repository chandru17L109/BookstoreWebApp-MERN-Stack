import React, { Component } from 'react';
import {Card,Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

import { FaCartPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import '../../Styles/commonStyling.css';
import '../../Styles/allBooksPage.css';

import SearchPage from '../SideSearchBar/searchbar';
import * as actions from '../../action/action';
import AvgRating from '../AvgRating/AvgRating';
// import TodayDealsPage from '../HomePage/Components/BookListComponents/todaydeals';

import CustomizedSnackbars from '../../alert_notify/alert';

class AllBooksPage extends Component {
    constructor(props){
        super(props);
        this.state = {current:1,notify: null}
    }

    componentDidMount(){
        this.props.onFetchAllbooks(this.state.current);
        this.props.OnAvgreview();
        this.props.onSetPageNo(1)
    }

    changenext(){
        var cur = this.props.pagenum;
        cur=cur+1
        this.props.onSetPageNo(cur)
        this.props.onFetchAllbooks(cur)
    }

    changeprev(){
        var cur = this.props.pagenum;
        cur=cur-1
        this.props.onSetPageNo(cur)
        this.props.onFetchAllbooks(cur)
    }

    decidecartlist(bookid){
        if(!this.props.Email){
            this.setState({notify: <CustomizedSnackbars open={true} message={"Please Login to continue !"}/>})
            setTimeout(()=>{
                this.setState({notify:null})
            },2000)
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
        var showprevbutton = true
        var shownextbutton = true
        var allbookslist;

        if(this.props.pagenum !== 1){
            showprevbutton = false
        }

        if(this.props.Books.length === 0 || this.props.Books.length !== 12){
            shownextbutton = true

            if(this.props.Books.length === 0){
                allbookslist = (
                    <div className="alert alert-dismissible alert-info m-3">
                        <strong>No Data Available !</strong>
                        <p>Click <b>Prev</b> to move to before page</p>
                        <Button class="page-link" onClick={this.changeprev.bind(this)} disabled={showprevbutton}>Prev</Button>
                    </div>)
            }
        }

        if(this.props.Books.length === 12 || this.props.Books.length > 0){

            if(this.props.Books.length === 12){
                shownextbutton = false
            }

             allbookslist = this.props.Books.map((books, i)=>{

                var booksreview = this.props.AvgReview;
                // eslint-disable-next-line
                var Reviewfound = booksreview.findIndex(function(post, index) {
                    if(post._id._id === books._id)
                        return true;
                })
                
                var RatingValue = Reviewfound!== -1 ? booksreview[Reviewfound].average_ : "";

                return(
                <div className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 cardmarign" key={i}>
                    
                    <Card className="card-top border-0 mb-4 card shadow rounded Cardshover">
                        
                        <Link to= {'/description/'+books._id}>
                            <Card.Img className="card-header bg-white " src={books.image} variant="top" />
                        </Link>
                        
                        <Card.Body className="card-body change-font text-dark" >
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
                                    <button class="btn btn-light border-0 wishlistbutton" onClick={this.decidewishlist.bind(this,books._id)}>
                                        <i className="text-danger "><FaHeart/></i>
                                    </button> 
                                </div>                               

                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            )
        })
    }
        
        return (
            <>
            {this.state.notify}

            <div className="body">
                <div class="allBooksPageCarousel">
                    <svg width="100%" height="100%">
                        <defs>
                            <pattern id="polka-dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <circle fill="#be9ddf" cx="25" cy="25" r="3"></circle>
                            </pattern>  
                            <style>
                            </style>
                        </defs>
                        <rect x="0" y="0" width="100%" height="100%" fill="url(#polka-dots)"> </rect>
                        <text x="50%" y="60%"  text-anchor="middle" className="fontsizecarousal"  >
                            “ Read, Learn and Grow ”
                        </text>
                    </svg>
                </div>
            </div>

            <div className="Main">
                <div className = "row">
                    <div className="col-4 col-sm-3 col-md-2 col-lg-2 col-xl-2 ">
                        <div className="search-option-catagory card shadow rounded">
                            <SearchPage childprops={this.props}/>
                        </div>
                    </div>

                    <div className="col-8 col-sm-9 col-md-9 col-xl-9 col-ls-9">
                        <div className="search-sidecontent">
                            <div className="row">
                            <h2  className="headingpage">Mixed Collections</h2>
                                <div className="row">
                                    {allbookslist} 
                                </div>
                            </div>
                       </div>
                       <div className="row">
                            <ul className="justify-content-center align-items-center pagination pagination-lg">
                                <li class="page-item list-unstyled">
                                    <Button class="page-link mr-1" onClick={this.changeprev.bind(this)} disabled={showprevbutton}>Prev</Button>
                                </li>
                                <li class="page-item list-unstyled">
                                    <Button class="page-link mr-1" >{this.props.pagenum}</Button>
                                </li>
                                <li class="page-item list-unstyled">
                                    <Button class="page-link mr-1" onClick={this.changenext.bind(this)} disabled={shownextbutton}>Next</Button>
                                </li>
                            </ul>
                         </div>
                    </div>
                </div>
                    

                <div className="bottomCard">
                    <Card.Title><h1><b className="bottomCardContent">Connect and Celebrate</b></h1></Card.Title>
                    <Card.Text>
                        <h3 className="bottomCardContent">Find Customers favourite books and gift those books to your loved ones.</h3>
                    </Card.Text>
                    <Card.Text><h3 className="bottomCardContent">Find early deals and order now</h3></Card.Text>
                </div>

                {/* <div className="row">
                    <h2  className="headingpage">Books you may like</h2>
                    <TodayDealsPage/>
                </div> */}
                
           </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Books: state.BookReducer.books,
        Email : state.userLogin.userInfo,
        AvgReview : state.BookReducer.avgreview,
        pagenum : state.BookReducer.pageNo

    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchAllbooks: (curr_page)=>dispatch(actions.fetchbooksbyquery(curr_page)),
        onAddcartlist : (email,bookid) =>  dispatch(actions.Addtocartlist(email,bookid)),
        onAddwishlist : (email,bookid) =>  dispatch(actions.Addtowishlist(email,bookid)),
        OnAvgreview : () => dispatch(actions.FetchAverageReview()),
        onSetPageNo :(num)=>dispatch({type:actions.SET_PAGE,payload:num})
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AllBooksPage)