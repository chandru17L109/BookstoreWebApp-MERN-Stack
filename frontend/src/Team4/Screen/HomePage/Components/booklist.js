import React, { Component } from 'react'
import {Carousel,Card, Row, Col} from 'react-bootstrap' 
import { FaCartPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa"
import {Link} from "react-router-dom";

import '../../../Styles/design.css';

import * as actions from '../../../action/action'
import {connect} from 'react-redux';

import HomePageCarousal2Image1 from '../../../images/homePageCarousal2Image1.png'
import HomePageCarousal2Image2 from '../../../images/homePageCarousal2Image2.jpg'
import HomePageCarousal2Image3 from '../../../images/homePageCarousal2Image3.jpg'
import BooklistCard2Image from '../../../images/booklistCard2Image.png'

import TodayDealsPage from './BookListComponents/todaydeals';
import NewRelease from './BookListComponents/newrelease';
import PopularBookPage from './BookListComponents/popularbook';
import CustomizedSnackbars from '../../../alert_notify/alert';
import AvgRating from '../../AvgRating/AvgRating'


class AllBooksPage extends Component {

    constructor(props){
        super(props);
        this.state = {allbooks : [], notify: null}
    }

    componentDidMount(){
       this.props.onFetchBooklistBooks();
       this.props.OnAvgreview();
    }

   decidecartlist(bookid){
        if(!this.props.Email){
            this.setState({notify: <CustomizedSnackbars open={true} message={"Please Login to continue !"}/>})
            setTimeout(()=>{
                this.setState({notify:null})
            },2000)
        }
        else{
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
        }
        else{
            this.setState({notify: <CustomizedSnackbars open={true} message={"Item successfully added to the WishList !"}/>})
            setTimeout(()=>{
                this.setState({notify:null})
            },2000)
            this.props.onAddwishlist(this.props.Email.email, bookid);
        }
    }

    render() {
        var allbookslist = this.props.Books.map((books, i)=>{
            var booksreview = this.props.AvgReview;
            // eslint-disable-next-line
            var Reviewfound = booksreview.findIndex(function(post, index) {
                if(post._id._id === books._id)
                    return true;
            })
            var RatingValue = Reviewfound!== -1 ? booksreview[Reviewfound].average_ : "";
              
            return(
                <div className="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 cardmarign" key={i}>
                    
                    <Card className="card-top border-0 mb-4 card shadow rounded Cardshover">
                        
                    <Link to= {'/description/'+books._id}>
                            <Card.Img className="card-header  leftpaddingcard bg-white" src={books.image} variant="top" />
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

            <div className="Main">
         
                <p className="visibility">{"Chandru & co"}</p>
                <div className="w-100 ">
                      <span className="heading_">Mixed Collections</span>
                      <Link to = {'/allbookspage'}> <a href = "/" className="viewmore">View more ..</a> </Link>
                </div>
                <div className="row">
                    {allbookslist} 
                </div>
            
                <div className="homePageCarousal2">
                    <Carousel fade>
                        <Carousel.Item interval={500}>
                            <img
                            className="homePageCarousal2Image"
                            src={HomePageCarousal2Image1}
                            alt="First slide"
                            />
                            <Carousel.Caption>
                                <div className="homePageCarousal2Content">
                                <h1><b className="homePageCarousal2Text">Find Your Deals and Order Here now!!!</b></h1></div>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item interval={500}>
                            <img
                            className="homePageCarousal2Image"
                            src={HomePageCarousal2Image2}
                            alt="Second slide"
                            />
                            <Carousel.Caption>
                                <div className="homePageCarousal2Content">
                                <h1><b className="homePageCarousal2Text">Discover Your Favourite Book Quick!!!</b></h1></div>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item interval={500}>
                            <img
                            className="homePageCarousal2Image"
                            src={HomePageCarousal2Image3}
                            alt="Third slide"
                            />
                            <Carousel.Caption>
                                <div className="homePageCarousal2Content">
                                <h1><b className="homePageCarousal2Text">Order Now and Gift Your Loved one!!!</b></h1></div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>

                <div className="w-100">
                      <span className="heading_"> Today Deals</span>
                      <Link to = {'/todaydealspage'}> <a href = "/" className="viewmore">View more ..</a> </Link>
                </div>
               
                <div className="row">
                    <TodayDealsPage props={this.props.props}/>
                </div>

                <div className="w-100">
                      <span className="heading_"> New Releases</span>
                      <Link to = {'/newrelease'}> <a href = "/" className="viewmore">View more ..</a> </Link>
                </div>

                <div className="row">
                    <NewRelease props={this.props.props}/>
                </div>

                    <Card className="booklistCard2">
                        <Row>
                            <Col md ={4}>
                                <Card.Img className="booklistCard2Image" variant="top" src={BooklistCard2Image} />
                            </Col>
                            <Col md = {8}>
                                <Card.Body>
                                    <Card.Text>
                                        <h1 className="booklistCard2Heading">The Summer Reading Challenge</h1>
                                        <h5 className="booklistCard2Text">Kids who read any 7 books can earn a Star Reader Certificate and a free 
                                        book from National Geographic Kids. Pick up a sign-up sheet at your local Books Store to get started. Limited time offer. Book choice limited to specific
                                        titles and ages (Grades K-8). Children must have parent’s permission.</h5>
                                        <h5 className="booklistCard2Heading">Book Store <br/> June 15 - August 15 </h5>
                                    </Card.Text>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>

                <div className="w-100">
                      <span className="heading_">Popular Books</span>
                      <Link to = {'/popularpage'}> <a href = "/" className="viewmore">View more ..</a> </Link>
                </div>
                <div className="row">
                    <PopularBookPage props={this.props.props}/>
                </div>
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
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchBooklistBooks: ()=>dispatch(actions.fetchbooksbyquery()),
        onAddcartlist : (email,bookid) =>  dispatch(actions.Addtocartlist(email,bookid)),
        onAddwishlist : (email,bookid) =>  dispatch(actions.Addtowishlist(email,bookid)),
        OnAvgreview : () => dispatch(actions.FetchAverageReview())
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AllBooksPage);


