import React, { Component } from 'react'
import {Card,Carousel,Button} from 'react-bootstrap' 
import fiction2  from "../../images/fiction1.JPG"
import {Link} from "react-router-dom";
import SearchPage from '../SideSearchBar/searchbar';
import { FaCartPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import '../../Styles/commonStyling.css';
import '../../Styles/popularPage.css';
import popularPageCarouselImage1 from '../../images/popularPageCarouselImage1.jpg'
import popularPageCarouselImage2 from '../../images/popularPageCarouselImage2.jpg'
import popularPageCarouselImage3 from '../../images/popularPageCarouselImage3.jpg'
import popularPageCarouselImage4 from '../../images/popularPageCarouselImage4.jpg'
import * as actions from '../../action/action'
// import React, { useEffect } from 'react'
import {connect} from 'react-redux';

 class PopularPage extends Component {

    constructor(props){
        super(props);
        this.state = {current:1}
    }

    componentDidMount() {
        this.props.onFetchAllbooks(this.state.current);
      }
  
     nextpage(){
      this.props.history.push('/description')
     }
  
     changenext(){
      var cur = this.state.current;
      this.setState({current: this.state.current+1})
      cur=cur+1
      this.props.onFetchAllbooks(cur)
    }
     changeprev(){
      var cur = this.state.current;
      this.setState({current: this.state.current-1})
      cur=cur-1
      this.props.onFetchAllbooks(cur)
    }
  
     decidenow(){
          console.log("decide function")
          alert("Please Login!")
          this.props.history.push('/login')
      }

    render() {
        var showprevbutton = true
        var shownextbutton = true
        console.log("this.props.Books",this.props.Books)

        if(this.state.current !== 1){
            showprevbutton = false
        }

        if(this.props.Books.length === 0 || this.props.Books.length !== 12){
            shownextbutton = true

            if(this.props.Books.length === 0){
                var popularbookslist = (
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

            var popularbookslist = this.props.Books.map((books, i)=>{
            // if(i < 4){
            return(
                <div className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 cardmarign" key={i} >
                    
                    <Card className="card-top border-0 mb-4 card shadow rounded Cardshover">
                        
                        <Link to= {{pathname : '/description', query : books}}>
                            <Card.Img className="card-header bg-white " src={fiction2} variant="top" />
                        </Link>
                        
                        <Card.Body className="card-body change-font text-dark" >
                            <Card.Text as="div" className="cardtext">

                                <div className="text-dark">
                                    <strong >{books.title}</strong>
                                    <br></br>
                                    <strong style={{fontWeight:"normal"}}>{books.author}</strong>
                                </div>
                                   
                                <strong style={{ textDecorationLine: 'line-through' }}>Rs. {books.price}</strong>
                                <strong style={{marginLeft:"7px",color:"red"}}>Rs. {books.sellprice}</strong>

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
                                    <button class="btn btn-light border-0 cartbutton"  onClick={this.decidenow.bind(this)}>
                                        <i className="text-primary "><FaCartPlus/></i>
                                    </button>
                                    <button class="btn btn-light border-0 wishlistbutton"   onClick={this.decidenow.bind(this)}>
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
                    <div className="col-4 col-sm-3 col-md-2 col-lg-2 col-xl-2 ">
                        <div className="search-option-catagory card shadow rounded">
                            <SearchPage/>
                        </div>
                    </div>

                    <div className="col-8 col-sm-9 col-md-9 col-xl-9 col-ls-9">
                        <div className="search-sidecontent">
                            <div className="row">
                            <h2  className="headingpage">Popular Books</h2>
                                <div className="row">
                                {popularbookslist} 
                                </div>
                            </div>
                       </div>
                       <div className="row">
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

                         </div>
                    </div>
                </div>

                <div className="row">
                    

                        <div className="container-fluid mb-5" >
    {/* <div className="row">
      <div className="col-md-12 p-5 text-white text-center" style={{backgroundColor: "#008577"}}>
        <h1>"Advertising solutions for books"</h1>
        <p> <em>Attract readers. Build Fans.</em> Sell Books</p>
        <a href="your_seller_account.html" className="btn btn-warning rounded-pill">Get started</a>
        <p>It only takes 15 minutes to setup your account.</p>
      </div>
    </div> */}
    </div>

                </div>
            </div>
            
            </>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('Inside Component ', state);
    return {
        Books: state.BookReducer.books
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        onFetchAllbooks: (curr_page)=>dispatch(actions.fetchbooksbyquery(curr_page)),
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
