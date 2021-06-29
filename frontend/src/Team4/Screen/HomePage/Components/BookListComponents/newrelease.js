import React, { Component } from 'react'
import {Button,Card,Row,Container} from 'react-bootstrap' 
import fiction2  from "../../../../images/nonfic3.JPG"
import { FaCartPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa"
import { FaStar } from "react-icons/fa"
import {Link} from "react-router-dom";
import '../../../../Styles/design.css';
import '../../../../Styles/commonStyling.css'

import * as actions from '../../../../action/action'
// import React, { useEffect } from 'react'
import {connect} from 'react-redux';

class NewRelease extends Component {

    constructor(props){
        super(props);
        this.state = {newrelease : [], newreleasequery:"sort=-date&limit=6"}
    }


    componentDidMount(){
        this.props.onFetchNewReleaseBooks(this.state.newreleasequery);
    }

    decidenow(){
        console.log("decide function")
        alert("Please Login!")
        this.props.history.push('/login')
    }

    render() {
        var newreleaselist = this.props.newreleaseBooks.map((books, i)=>{
            return(

                <div className="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 cardmarign" key={i}>
                    
                    <Card className="card-top border-0 mb-4 card shadow rounded Cardshover">
                        
                        <Link to= {{pathname : '/description', query : books}}>
                            <Card.Img className="card-header leftpaddingcard bg-white" src={fiction2} variant="top" />
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
        
        return (
            <>
                {newreleaselist}    
            </>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('Inside Component ', state);
    return {
        newreleaseBooks: state.BookReducer.homepagenewrelease
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        onFetchNewReleaseBooks: (condition_popular)=>dispatch(actions.fetchbooksHomepagenewrelease(condition_popular)),
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