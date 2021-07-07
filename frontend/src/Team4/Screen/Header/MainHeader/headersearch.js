import {Card} from 'react-bootstrap' 
import { FaCartPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa"
// import { FaStar } from "react-icons/fa"
import {Link} from "react-router-dom";
import * as actions from '../../../action/action'
import {connect} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router";
// import AvgRating from '../../AvgRating/AvgRating'
import CustomizedSnackbars from '../../../alert_notify/alert';

function Headersearch(props){

    const { match: { params } } = props;

    // const [bookid, setBookid] = useState("")
    const [notify, setNotify] = useState(null)

    useEffect(() => {
        console.log("props,params.searchelement",props,params.searchelement);
        // setBookid(params.searchelement)
        props.onFetchheadersearchresults(params.searchelement);
        // props.onFetchBookReviews(params.searchelement);
    },[params.searchelement]);

    const history = useHistory();

    const decidewishlist = (books) => {
        if(!props.Email){
          setNotify(<CustomizedSnackbars open={true} message={"Please Login to continue !"}/>)
          setTimeout(()=>{
            setNotify(null)
          },2000)
          }else{
            setNotify(<CustomizedSnackbars open={true} message={"Item successfully added to the Cart !"}/>)
            setTimeout(()=>{
              setNotify(null)
            },2000)
            props.onAddwishlist(props.Email.email, books._id);
          }
        }

        const decidecartlist = (books) =>{
            if(!props.Email){
              setNotify(<CustomizedSnackbars open={true} message={"Please Login to continue !"}/>)
              setTimeout(()=>{
                setNotify(null)
              },2000)
            //   this.props.props.history.push('/login')
            }else{
              setNotify(<CustomizedSnackbars open={true} message={"Item successfully added to the Cart !"}/>)
              setTimeout(()=>{
              },2000)
              props.onAddcartlist(props.Email.email, books._id);
            } 
            
          }

    var newsearchresultslist;
    console.log("this.props.Books headersearch",props.Books)
       if(props.Books.message){
        newsearchresultslist = (
            <div className="alert alert-dismissible alert-info">
                <strong className="m-5">No Search Results Found !</strong>
           </div>)
       }else{
        newsearchresultslist = props.Books.map((books, i)=>{

            // var booksreview = props.AvgReview;
            // var Reviewfound = booksreview.findIndex(function(post, index) {
            //     if(post._id._id === props.Bookdetail._id)
            //         return true;
            // })
            
            // var RatingValue = Reviewfound!== -1 ? booksreview[Reviewfound].average_ : "";
           
            return(
                <div className="ml-5 col-4 col-sm-4 col-md-3 col-lg-3 col-xl-3 cardmarign" key={i} >
                {notify}
                    <Card className="card-top border-0 mb-5 card shadow rounded Cardshover">
                        
                    <Link to= {'/description/'+books._id}>
                            <Card.Img className="card-header headersearchimg bg-white " src={books.image} variant="top" />
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
                                    {/* {RatingValue} */}
                                    {/* <AvgRating rating={Math.round(RatingValue)}></AvgRating> */}
                                    </strong>
                                    {/* <strong style={{marginLeft:"10px"}}>({books.discount}%)</strong> */}
                                </div>

                                <div className="aligncartwishlist">
                                    <button class="btn btn-light border-0 cartbutton"  onClick={(books)=>{decidecartlist(books)}}>
                                        <i className="text-primary "><FaCartPlus/></i>
                                    </button>
                                    <button class="btn btn-light border-0 wishlistbutton"  onClick={(books)=>{decidewishlist(books)}}>
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
            <div className="Main">
            <div className = "row">

                    <div className="col-12 col-sm-12 col-md-12 col-xl-12 col-ls-12">
                        <div className="search-sidecontent">
                            <div className="row">
                            <h2  className="headingpage ml-5">Search Results</h2>
                                <div className="row">
                                {newsearchresultslist} 
                                </div>
                            </div>
                       </div>
                    </div>
                </div>
        </div>   
        )
    }
const mapStateToProps = (state) => {
    console.log('Inside Component ', state);
    return {
        Books: state.BookReducer.books,
      Email : state.userLogin.userInfo
        //  AvgReview : state.BookReducer.avgreview,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        onAddcartlist : (email,bookid) =>  dispatch(actions.Addtocartlist(email,bookid)),
        onAddwishlist : (email,bookid) =>  dispatch(actions.Addtowishlist(email,bookid)),  
        onFetchheadersearchresults : (searchvalue)=>dispatch(actions.fetchheadersearchresults(searchvalue)),
        // OnAvgreview : () => dispatch(actions.FetchAverageReview()),
        // onFetchBookReviews : (bookid) => dispatch(actions.FetchReview(bookid))  
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Headersearch);


// fetch('http://localhost:4000/books/CommonSearch/'+params.searchelement,{
//     headers:{'content-type': 'application/json'},
// })
// .then(res=>res.json())
// .then(data=>{
//     this.setState({headersearch : data,paginate : data.pagination})
// });
// console.log("alldeals",this.state.headersearch)