import React, { Component } from 'react'
import {Card,Carousel} from 'react-bootstrap' 
// import fiction2  from "../../images/fiction1.JPG"
import {Link} from "react-router-dom";
// import SearchPage from '../SideSearchBar/searchbar';
import { FaCartPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
// import { FaStar } from "react-icons/fa";
import '../../Styles/commonStyling.css';
import '../../Styles/popularPage.css';
import popularPageCarouselImage1 from '../../images/popularPageCarouselImage1.jpg'
import popularPageCarouselImage2 from '../../images/popularPageCarouselImage2.jpg'
import popularPageCarouselImage3 from '../../images/popularPageCarouselImage3.jpg'
import popularPageCarouselImage4 from '../../images/popularPageCarouselImage4.jpg'
import popularPageBottomimage from '../../images/popularPageBottomimage.jpg'

import * as actions from '../../action/action'
// import React, { useEffect } from 'react'
import {connect} from 'react-redux';
import CustomizedSnackbars from '../../alert_notify/alert';

import TodayDealsPage from '../HomePage/Components/BookListComponents/todaydeals';


import AvgRating from '../AvgRating/AvgRating'

 class PopularPage extends Component {

    constructor(props){
        super(props);
        this.state = {current:1,notify: null}
    }

    componentDidMount() {
        this.props.onFetchAverageReview();
      }
  
     nextpage(){
      this.props.history.push('/description')
     }
  
    //  changenext(){
    //   var cur = this.state.current;
    //   this.setState({current: this.state.current+1})
    //   cur=cur+1
    //   this.props.onFetchAllbooks(cur)
    // }
    //  changeprev(){
    //   var cur = this.state.current;
    //   this.setState({current: this.state.current-1})
    //   cur=cur-1
    //   this.props.onFetchAllbooks(cur)
    // }
  
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
        // var showprevbutton = true
        // var shownextbutton = true
        // console.log("this.props.Books",this.props.Books)

        // if(this.state.current !== 1){
        //     showprevbutton = false
        // }

        // if(this.props.Books.length === 0 || this.props.Books.length !== 12){
        //     shownextbutton = true

        //     if(this.props.Books.length === 0){
        //         var popularbookslist = (
        //             <div className="alert alert-dismissible alert-info m-3">
        //                 <strong>No Data Available !</strong>
        //                 <p>Click <b>Prev</b> to move to before page</p>
        //                 <Button class="page-link" onClick={this.changeprev.bind(this)} disabled={showprevbutton}>Prev</Button>
        //             </div>)
        //     }
        // }

        // if(this.props.Books.length === 12 || this.props.Books.length > 0){

        //     if(this.props.Books.length === 12){
        //         shownextbutton = false
        //     }
            // eslint-disable-next-line
            var popularbookslist = this.props.Books.map((books, i)=>{

                var booksreview = this.props.AvgReview;
                // console.log("booksreview",booksreview);
                // eslint-disable-next-line
                var Reviewfound = booksreview.findIndex(function(post, index) {
                    if(post._id === books._id)
                        return true;
                })
                
                var RatingValue = Reviewfound!== -1 ? booksreview[Reviewfound].average_ : "";
                // console.log(Reviewfound)
             
            if(i < 12){
            return(
                <div className="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 cardmarign" key={i}>
                    <Card className="card-top border-0 mb-4 card shadow rounded Cardshover">
                        
                    <Link to= {'/description/'+books._id._id}>
                            <Card.Img className="card-header leftpaddingcard bg-white " src={books._id.image} variant="top" />
                        </Link>
                        
                        <Card.Body className="card-body leftpaddingcarddata change-font text-dark" >
                            <Card.Text as="div" className="cardtext">

                                <div className="text-dark">
                                    <strong >{books._id.title}</strong>
                                    <br></br>
                                    <strong style={{fontWeight:"normal"}}>{books._id.authors}</strong>
                                </div>
                                   
                                <strong style={{ textDecorationLine: 'line-through' }}>Rs. {books._id.price}</strong>
                                <strong style={{marginLeft:"7px",color:"red"}}>Rs.{Math.round(books._id.price - (books._id.price * books._id.discount/100))}</strong>

                                <div>
                                    <strong style={{float:"left"}} variant="link">
                                        {/* {RatingValue} */}
                                    <AvgRating rating={Math.round(RatingValue)}></AvgRating>
                                    </strong>
                                    <strong style={{marginLeft:"10px"}}>({books._id.discount}%)</strong>
                                </div>

                                <div className="aligncartwishlist">
                                    <button class="btn btn-light border-0 cartbutton"  onClick={this.decidecartlist.bind(this,books._id)}>
                                        <i className="text-primary "><FaCartPlus/></i>
                                    </button>
                                    <button class="btn btn-light border-0 wishlistbutton"   onClick={this.decidewishlist.bind(this,books._id)}>
                                        <i className="text-danger "><FaHeart/></i>
                                    </button> 
                                </div>                             

                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            )
            }
        })
        
        return (
            <>
                {this.state.notify}

            <div className="popularPageCarousel">
                <Carousel fade>
                <Carousel.Item interval={1000}>
                    <img
                    className="popularPageCarouselImage"
                    src={popularPageCarouselImage1}
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img
                    className="popularPageCarouselImage"
                    src={popularPageCarouselImage2}
                    alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img
                    className="popularPageCarouselImage"
                    src={popularPageCarouselImage3}
                    alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img
                    className="popularPageCarouselImage"
                    src={popularPageCarouselImage4}
                    alt="Third slide"
                    />
                </Carousel.Item>
                </Carousel>
            </div>

            <div className="Main">
            <div className = "row">
                    {/* <div className="col-4 col-sm-3 col-md-2 col-lg-2 col-xl-2 ">
                        <div className="search-option-catagory card shadow rounded">
                        <SearchPage childprops={this.props}/>
                        </div>
                    </div> */}

                    {/* <div className="col-8 col-sm-9 col-md-9 col-xl-9 col-ls-9">
                        <div className="search-sidecontent">
                            <div className="row">
                            <h2  className="headingpage">Popular Books</h2> */}
                            <div className="row"> 
                        <h2  className="headingpage">Top Rated Books</h2> 
                                {popularbookslist} 
                                 </div>
                            {/* </div>
                       </div>  */}
                       {/* <div className="row">
                            <ul className="justify-content-center align-items-center pagination pagination-lg">
                                <li class="page-item list-unstyled">
                                    <Button class="page-link mr-1" onClick={this.changeprev.bind(this)} disabled={showprevbutton}>Prev</Button>
                                </li>
                                <li class="page-item list-unstyled">
                                    <Button class="page-link mr-1" >{this.state.current}</Button>
                                </li>
                                <li class="page-item list-unstyled">
                                    <Button class="page-link mr-1" onClick={this.changenext.bind(this)} disabled={shownextbutton}>Next</Button>
                                </li>
                            </ul>

                         </div> */}
                    </div>
                {/* </div> */}

                <div className="row">
                    

                        {/* <div className="container-fluid mb-5" > */}
                        {/* <div className="bottomCard"> */}
                <Card className="bottomCard">
                    {/* <Card.Img className="bottomCardImage" src="https://europeanmovement.eu/wp-content/uploads/2017/09/education-1024x422.jpg" alt="Card image" /> */}
                    {/* <Card.ImgOverlay> */}
                        <Card.Title ><h1><b className="bottomCardContent">“Reading is essential for those </b></h1></Card.Title>
                        <Card.Title ><h1><b className="bottomCardContent">who seek to rise above the ordinary.” - Jim Rohn </b></h1></Card.Title>
                        
                    {/* </Card.ImgOverlay> */}
                </Card>
            {/* </div> */}
    {/* </div> */}

                </div>

                <div className="row">
                <h2  className="headingpage">Books you may like</h2>
                    <TodayDealsPage/>
                </div>

                {/* {/* <div className="bottomCard"> */}
                    {/* <Card>
                        <Card.Img className="bottomCardImage" src={popularPageBottomimage}/>
                    </Card> */}
                {/* </div> */}

            </div>
            
            </>
        )
    }
}
     
  const mapStateToProps = (state) => {
    console.log('Inside Component ', state);
    return {
        Books: state.BookReducer.avgreview,
        Email : state.userLogin.userInfo,
        AvgReview : state.BookReducer.avgreview,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        onFetchAverageReview: ()=>dispatch(actions.FetchAverageReview()),
        onAddcartlist : (email,bookid) =>  dispatch(actions.Addtocartlist(email,bookid)),
        onAddwishlist : (email,bookid) =>  dispatch(actions.Addtowishlist(email,bookid)),
        OnAvgreview : () => dispatch(actions.FetchAverageReview())
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(PopularPage);
   





//     componentDidMount(){
//         fetch('http://localhost:4000'+'/books/?sort=-ratings',{
//             headers:{'content-type': 'application/json'},
//         })
//         .then(res=>res.json())
//         .then(data=>{
//             this.setState({popularbooks : data.data})
//         });
//         console.log("alldeals",this.state.popularbooks)
//     }

// function PopularPage(props){


// all(){
//     fetch('http://localhost:4000'+'/books/?sort=-ratings',{
//         headers:{'content-type': 'application/json'},
//     })
//     .then(res=>res.json())
//     .then(data=>{
//         this.setState({popularbooks : data.data})
//     });
//     console.log("alldeals",this.state.popularbooks)
// }

// below500(){
// fetch('http://localhost:4000'+'/books/?sort=-ratings&price[lt]=500',{
//     headers:{'content-type': 'application/json'},
// })
// .then(res=>res.json())
// .then(data=>{
//     this.setState({popularbooks : data.data})
// });
// console.log("below500",this.state.popularbooks)
// }

// AboveEqual500(){
// fetch('http://localhost:4000'+'/books/?sort=-ratings&price[gte]=500',{
//     headers:{'content-type': 'application/json'},
// })
// .then(res=>res.json())
// .then(data=>{
//     this.setState({popularbooks : data.data})
// });
// console.log("AboveEqual500",this.state.popularbooks)
// }

// AboveEqual1000(){
// fetch('http://localhost:4000'+'/books/?sort=-ratings&price[gte]=1000',{
//     headers:{'content-type': 'application/json'},
// })
// .then(res=>res.json())
// .then(data=>{
//     this.setState({popularbooks : data.data})
// });
// console.log("AboveEqual500",this.state.popularbooks)
// }
