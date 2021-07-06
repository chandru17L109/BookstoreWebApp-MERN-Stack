import {Card} from 'react-bootstrap' 
import { FaCartPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa"
import { FaStar } from "react-icons/fa"
import {Link} from "react-router-dom";
import * as actions from '../../../action/action'
import {connect} from 'react-redux';
import React, { useEffect } from 'react';
import { useHistory } from "react-router";

function Headersearch(props){

    const { match: { params } } = props;
    useEffect(() => {
        console.log("props,params.searchelement",props,params.searchelement);
        props.onFetchheadersearchresults(params.searchelement);
    },[params.searchelement]);

    const history = useHistory();

    const decidenow = () =>{
        console.log("decide function")
        alert("Please Login!")
        history.push('/login');
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
            return(
                <div className="ml-5 col-4 col-sm-4 col-md-3 col-lg-3 col-xl-3 cardmarign" key={i} >
                    
                    <Card className="card-top border-0 mb-5 card shadow rounded Cardshover">
                        
                        <Link to= {{pathname : '/description', query : books}}>
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
                                        <i className="text-warning"><FaStar/></i>
                                        <i className="text-warning"><FaStar/></i>
                                        <i className="text-warning"><FaStar/></i>
                                        <i className="text-warning"><FaStar/></i>
                                        <i className="text-warning"><FaStar/></i>
                                    </strong>
                                    <strong style={{marginLeft:"10px"}}>({books.discount}%)</strong>
                                </div>

                                <div className="aligncartwishlist">
                                    <button class="btn btn-light border-0 cartbutton"  onClick={decidenow}>
                                        <i className="text-primary "><FaCartPlus/></i>
                                    </button>
                                    <button class="btn btn-light border-0 wishlistbutton"   onClick={decidenow}>
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
        Books: state.BookReducer.books
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        onFetchheadersearchresults : (searchvalue)=>dispatch(actions.fetchheadersearchresults(searchvalue)),
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