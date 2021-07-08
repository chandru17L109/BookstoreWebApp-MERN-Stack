import {Card} from 'react-bootstrap' 
import {Link} from "react-router-dom";

import * as actions from '../../../action/action'
import {connect} from 'react-redux';

import React, { useEffect, useState } from 'react';


function Headersearch(props){

    const { match: { params } } = props;
    const [notify,] = useState(null)

    useEffect(() => {
        
        props.onFetchheadersearchresults(params.searchelement);
        },[params.searchelement]);


    var newsearchresultslist;
       if(props.Books.message){
        newsearchresultslist = (
            <div className="alert alert-dismissible alert-info">
            <strong className="m-5">No Search Results Found !</strong>
            </div>)
       }
       else{
        newsearchresultslist = props.Books.map((books, i)=>{

           return(
               
                <div className="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 cardmarign" key={i}>
                {notify}
                    <Card className="card-top border-0 mb-5 card shadow rounded Cardshover">
                    <Link to= {'/description/'+books._id}>
                    <Card.Img className="card-header leftpaddingcard headersearchimg bg-white " src={books.image} variant="top" />
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
                    </Card.Text>
                    </Card.Body>
                    </Card>
                </div>
            )
        })}
       
           return (
               <div className="Main">
               <div className="row">
                        <h2  className="headingpage ml-3">Search Results</h2>
                        <h6 className="ml-3 text-secondary"> Click on the book image to view details</h6>
                             {newsearchresultslist} 
                        </div>
                        </div>
                    )}
                        
                    
const mapStateToProps = (state) => {
    console.log('Inside Component ', state);
    return {
        Books: state.BookReducer.books,
        Email : state.userLogin.userInfo
      }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {        
        onFetchheadersearchresults : (searchvalue)=>dispatch(actions.fetchheadersearchresults(searchvalue)),     
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Headersearch);