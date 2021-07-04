import React, { Component } from 'react'
import {Card} from 'react-bootstrap' 
import fiction2  from "../../../../images/fiction1.JPG"
import {Link} from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa"
import { FaStar } from "react-icons/fa";
import '../../../../Styles/design.css';
import * as actions from '../../../../action/action'
// import React, { useEffect } from 'react'
import {connect} from 'react-redux';

class PopularBookPage extends Component {

    constructor(){
        super();
        this.state = {popularbooks : [] , popular : "sort=-ratings&limit=6"}
    }

    componentDidMount(){
        this.props.onFetchpopularBooks(this.state.popular);
    }
   
    decidecartlist(bookid){
        if(!this.props.Email){
          // alert("Please Login!")
          this.props.props.history.push('/login')
        }else{
          console.log("this.props.Email and bookid",this.props.Email.email, bookid)
          this.props.onAddcartlist(this.props.Email.email, bookid);
        }  
    }

    decidewishlist(bookid){
      if(!this.props.Email){
          // alert("Please Login!")
          this.props.props.history.push('/login')
        }else{
          console.log("this.props.Email and bookid",this.props.Email.email, bookid)
          this.props.onAddwishlist(this.props.Email.email, bookid);
        }
  }


    render() {
        var popularbookslist = this.props.popularBooks.map((books, i)=>{
            return(
                <div className="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 cardmarign" key={i}>
                    
                    <Card className="card-top border-0 mb-4 card shadow rounded Cardshover">
                        
                        <Link to= {{pathname : '/description', query : books}}>
                            <Card.Img className="card-header leftpaddingcard bg-white" src={books.image} variant="top" />
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
        
        return (
            <>
            
                {popularbookslist} 
                            
            </>
        )
    }
}

  const mapStateToProps = (state) => {
    console.log('Inside Component ', state);
    return {
        popularBooks : state.BookReducer.homepagepopularbooks,
        Email : state.userLogin.userInfo

    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        onFetchpopularBooks: (condition_popular)=>dispatch(actions.fetchbooksHomepagepopularbooks(condition_popular)),
        onAddcartlist : (email,bookid) =>  dispatch(actions.Addtocartlist(email,bookid)),
        onAddwishlist : (email,bookid) =>  dispatch(actions.Addtowishlist(email,bookid)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(PopularBookPage);
