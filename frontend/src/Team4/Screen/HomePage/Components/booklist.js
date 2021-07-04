import React, { Component } from 'react'
import {Carousel,Card,Container, Row, Col} from 'react-bootstrap' 
import nonfic2  from "../../../images/nonfic2.JPG"
import { FaCartPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa"
import { FaStar } from "react-icons/fa"
import TodayDealsPage from './BookListComponents/todaydeals';
import NewRelease from './BookListComponents/newrelease';
import PopularBookPage from './BookListComponents/popularbook';
import {Link} from "react-router-dom";
import '../../../Styles/design.css';
import HomePageCarousal2Image1 from '../../../images/homePageCarousal2Image1.png'
import HomePageCarousal2Image2 from '../../../images/homePageCarousal2Image2.jpg'
import HomePageCarousal2Image3 from '../../../images/homePageCarousal2Image3.jpg'
import BooklistCard2Image from '../../../images/booklistCard2Image.png'
import * as actions from '../../../action/action'
import {connect} from 'react-redux';
import CustomizedSnackbars from '../../../alert_notify/alert';

// import SellingPrice from './BookListComponents/calculateprice'

class AllBooksPage extends Component {

    constructor(props){
        super(props);
        this.state = {allbooks : [], notify: null}
    }

    componentDidMount(){
       this.props.onFetchBooklistBooks();
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
        var allbookslist = this.props.Books.map((books, i)=>{
            // if(i < 4){
            return(
                <div className="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 cardmarign" key={i}>
                    
                    <Card className="card-top border-0 mb-4 card shadow rounded Cardshover">
                        
                        <Link to= {{pathname : '/description', query : books}}>
                            <Card.Img className="card-header  leftpaddingcard bg-white" src={books.image} variant="top" />
                        </Link>
                        
                        <Card.Body className="card-body  leftpaddingcarddata change-font text-dark" >
                            <Card.Text as="div" className="cardtext">

                                <div className="text-dark">
                                    <strong >{books.title}</strong>
                                    <br></br>
                                    <strong style={{fontWeight:"normal"}}>{books.authors}</strong>
                                </div>
                                   
                                <strong style={{ textDecorationLine: 'line-through' }}>Rs. {books.price}</strong>
                                {/* <strong style={{marginLeft:"7px",color:"red"}}>Rs.{SellingPrice(books.price,books.discount)}</strong> */}
                                <strong style={{marginLeft:"7px",color:"red"}}>Rs.{Math.round(books.price - (books.price * books.discount/100))}</strong>
                               

                                <div>
                                    <strong style={{float:"left"}} variant="link">
                                        <i className="text-warning"><FaStar/></i>
                                        <i className="text-warning"><FaStar/></i>
                                        <i className="text-warning"><FaStar/></i>
                                        <i className="text-warning"><FaStar/></i>
                                        <i className="text-warning"><FaStar/></i>
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
            // }
        })
        
        return (
            <>
            {this.state.notify}

            <div className="Main">
         
                <p className="visibility">{"Chandru & co"}</p>
                <div className="w-100 ">
                      <span className="heading_">Mixed Collections</span>
                      <Link to = {'/allbookspage'}> <a className="viewmore">View more ..</a> </Link>
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
                      <Link to = {'/todaydealspage'}> <a className="viewmore">View more ..</a> </Link>
                </div>
               
                <div className="row">
                    <TodayDealsPage props={this.props.props}/>
                </div>

                <div className="w-100">
                      <span className="heading_"> New Releases</span>
                      <Link to = {'/newrelease'}> <a className="viewmore">View more ..</a> </Link>
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

                {/* <div className="booklistCard2">
                    <div class="card flex-row flex-wrap booklistCard2Container">
                        <img className="booklistCard2Image" src="https://static.storyhouse.com/cms/wp-content/uploads/2020/06/Newsletter-Banner-1200x4002-1-2048x683.png" alt=""/>
                        <div class="card-block card-content booklistCard2Content">
                            <h1 class="card-title" className="booklistCard2Heading">The Summer Reading Challenge </h1>
                            <div className="lineHeight">
                            <p class="card-text" ><div><p className="booklistCard2Text">Kids who read any 7 books can earn a Star Reader Certificate and a free </p></div></p>
                            <p class="card-text"><div><p className="booklistCard2Text">book from National Geographic Kids. Pick up a sign-up sheet at your local </p></div></p>
                            <p class="card-text"><div><p className="booklistCard2Text">Books Store to get started. Limited time offer. Book choice limited to specific</p> </div></p>
                            <p class="card-text"><div><p className="booklistCard2Text"> titles and ages (Grades K-8). Children must have parent’s permission.</p></div></p>
                            </div>
                            <h5 class="card-title booklistCard2Heading">Book Store <br/> June 15 - August 15 </h5>
                        </div>
                    </div>
                </div> */}
                <div className="w-100">
                      <span className="heading_">Popular Books</span>
                      <Link to = {'/popularpage'}> <a className="viewmore">View more ..</a> </Link>
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
    console.log('Inside Component ', state);
    return {
        Books: state.BookReducer.books,
        Email : state.userLogin.userInfo

    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        onFetchBooklistBooks: ()=>dispatch(actions.fetchbooksbyquery()),
        onAddcartlist : (email,bookid) =>  dispatch(actions.Addtocartlist(email,bookid)),
        onAddwishlist : (email,bookid) =>  dispatch(actions.Addtowishlist(email,bookid)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AllBooksPage);


//   fetch('http://localhost:4000'+'/books',{
//     headers:{'content-type': 'application/json'},
// })
// .then(res=>res.json())
// .then(data=>{
//     this.setState({allbooks : data.data})
// });
// console.log("alldeals",this.state.allbooks)