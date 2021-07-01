import React, { Component } from 'react'
import {Card,Button} from 'react-bootstrap' 
import nonfic2  from "../../images/nonfic2.JPG"
import SearchPage from '../SideSearchBar/searchbar';
import { FaCartPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa"
import { FaStar } from "react-icons/fa"
import {Link} from "react-router-dom";
import '../../Styles/commonStyling.css';
import '../../Styles/allBooksPage.css';
import AllbooksbottomCardImage from '../../images/AllbooksbottomCardImage.png'
import * as actions from '../../action/action'
// import React, { useEffect } from 'react'

import {connect} from 'react-redux';
import NewRelease from '../HomePage/Components/BookListComponents/newrelease';

class AllBooksPage extends Component {
    constructor(props){
        super(props);
        this.state = {current:1}
    }

   componentDidMount(){
      this.props.onFetchAllbooks(this.state.current);
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

    decidecartlist(bookid){
        if(!this.props.Email){
          // alert("Please Login!")
          this.props.history.push('/login')
        }else{
          console.log("this.props.Email and bookid",this.props.Email.email, bookid)
          this.props.onAddcartlist(this.props.Email.email, bookid);
        }  
    }

    decidewishlist(bookid){
      if(!this.props.Email){
          // alert("Please Login!")
          this.props.history.push('/login')
        }else{
          console.log("this.props.Email and bookid",this.props.Email.email, bookid)
          this.props.onAddwishlist(this.props.Email.email, bookid);
        }
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
                var allbookslist = (
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

            var allbookslist = this.props.Books.map((books, i)=>{
                return(
                <div className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 cardmarign" key={i}>
                    
                    <Card className="card-top border-0 mb-4 card shadow rounded Cardshover">
                        
                        <Link to= {{pathname : '/description', query : books}}>
                            <Card.Img className="card-header bg-white " src={nonfic2} variant="top" />
                        </Link>
                        
                        <Card.Body className="card-body change-font text-dark" >
                            <Card.Text as="div" className="cardtext">

                                <div className="text-dark">
                                    <strong >{books.title}</strong>
                                    <br></br>
                                    <strong style={{fontWeight:"normal"}}>{books.author}</strong>
                                </div>
                                   
                                <strong style={{ textDecorationLine: 'line-through' }}>Rs. {books.price}</strong>
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
                            <SearchPage/>
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
                                    <Button class="page-link mr-1" >{this.state.current}</Button>
                                </li>
                                <li class="page-item list-unstyled">
                                    <Button class="page-link mr-1" onClick={this.changenext.bind(this)} disabled={shownextbutton}>Next</Button>
                                </li>
                            </ul>

                         </div>
                    </div>
                </div>
                    

                <div className="bottomCard">
                    <Card className=" text-Black">
                        <Card.Img className="bottomCardImage" src={AllbooksbottomCardImage} alt="Card image" />
                        <Card.ImgOverlay>
                            <Card.Title><h1><b className="bottomCardContent">Connect and Celebrate</b></h1></Card.Title>
                            <Card.Text>
                                <h3 className="bottomCardContent">Find Customers favourite books and gift those books to your loved ones.</h3>
                            </Card.Text>
                            <Card.Text><h3 className="bottomCardContent">Find early deals and order now</h3></Card.Text>
                        </Card.ImgOverlay>
                    </Card>
                </div>

                {/* <div className="w-100">
                      <span className="heading_"> Today Deals</span>
                </div>
               
                <div className="row">
                    <NewRelease props={this.props.props}/>
                </div> */}
                
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
        onFetchAllbooks: (curr_page)=>dispatch(actions.fetchbooksbyquery(curr_page)),
        onAddcartlist : (email,bookid) =>  dispatch(actions.Addtocartlist(email,bookid)),
        onAddwishlist : (email,bookid) =>  dispatch(actions.Addtowishlist(email,bookid)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AllBooksPage);


// const mapStateToProps = (state) => {
//     console.log('Inside Component ', state);
//     return {
//         Books: state.BookReducer.books
//     }
//   }
  
//   const mapDispatchToProps = (dispatch) => {
//     return {
//         // onFetchAllbooks: ()=>dispatch(actions.fetchbooksbymixedcollections()),
//         onFetchAllbooks: ()=>dispatch(actions.fetchbooksbyquery()),
//     }
//   }
  
//   export default connect(mapStateToProps, mapDispatchToProps)(AllBooksPage);



// fetchnextorprevpage(CurrentPage){
//     fetch(`http://localhost:4000/books?page=${CurrentPage}&limit=12`,{
//         headers:{'content-type': 'application/json'},
//     })
//     .then(res=>res.json())
//     .then(data=>{
//         this.setState({allbooks : data.data, paginate : data.pagination})
//     });
// }


//     componentDidMount(){
//         fetch('http://localhost:4000'+'/books',{
//             headers:{'content-type': 'application/json'},
//         })
//         .then(res=>res.json())
//         .then(data=>{
//             this.setState({allbooks : data.data, paginate : data.pagination})
//         });
//    }

// changenext(){
//     var cur = this.state.current;
//     if(!this.state.paginate.next){
//         console.log("no next page")
//     }else{
//         this.setState({current: this.state.current+1})
//         cur=cur+1
//         this.fetchnextorprevpage.bind(cur)
//     }
// }

// changeprev(){
//     var cur = this.state.current;
//     if(!this.state.paginate.prev){
//         console.log("no prev page")
//     }else{
//         this.setState({current: this.state.current-1})
//         cur = cur-1
//         this.fetchnextorprevpage.bind(cur)
//     }
// }