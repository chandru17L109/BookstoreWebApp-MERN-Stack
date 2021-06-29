import React, { Component } from 'react'
import {Card} from 'react-bootstrap' 
import nonfic2  from "../../../images/nonfic2.JPG"
import SearchPage from '../../SideSearchBar/searchbar';
import { FaCartPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa"
import { FaStar } from "react-icons/fa"
import {Link} from "react-router-dom";
import * as actions from '../../../action/action'
import {connect} from 'react-redux';


class Headersearch extends Component {
    constructor(props){
        super(props);
        this.state = {headersearch : [], prev:false, next:true, showprev:true, shownext:true, current:1,paginate:[]}
    }


    componentDidMount(){
        const { match: { params } } = this.props;
        console.log(this.props,params.searchelement);
        this.props.onFetchheadersearchresults(params.searchelement);
       
    }

    decidenow(){
        console.log("decide function")
        alert("Please Login!")
        this.props.history.push('/login')
    }

    // changenext(){
    //     var cur = this.state.current;
    //     if(!this.state.paginate.next){
    //         console.log("no next page")
    //     }else{
    //         this.setState({current: this.state.current+1})
    //         cur=cur+1
    //         fetch(`http://localhost:4000/books/CommonSearch/?page=${cur}&limit=12`,{
    //             headers:{'content-type': 'application/json'},
    //         })
    //         .then(res=>res.json())
    //         .then(data=>{
    //             this.setState({allbooks : data.data, paginate : data.pagination})
    //         });
    //     }
    // }

    // changeprev(){
    //     var cur = this.state.current;
    //     if(!this.state.paginate.prev){
    //         console.log("no prev page")
    //     }else{
    //         this.setState({current: this.state.current-1})
    //         cur = cur-1
    //         fetch(`http://localhost:4000/books/CommonSearch/?page=${cur}&limit=12`,{
    //             headers:{'content-type': 'application/json'},
    //         })
    //         .then(res=>res.json())
    //         .then(data=>{
    //             this.setState({allbooks : data.data, paginate : data.pagination})
    //         });
    //     }
    // }

    render() {
        console.log("this.props.Books headersearch",this.props.Books)
       if(this.props.Books.message){
        var newsearchresultslist = (
            <div className="alert alert-dismissible alert-info">
                <strong className="m-5">No Search Results Found !</strong>
           </div>)
       }else{
        var newsearchresultslist = this.props.Books.map((books, i)=>{
            return(
                <div className="ml-5 col-4 col-sm-4 col-md-3 col-lg-3 col-xl-3 cardmarign" key={i} >
                    
                    <Card className="card-top border-0 mb-5 card shadow rounded Cardshover">
                        
                        <Link to= {{pathname : '/description', query : books}}>
                            <Card.Img className="card-header headersearchimg bg-white " src={nonfic2} variant="top" />
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
            <div className="Main">
            {/* <div className="row"> */}
            <div className = "row">
                    {/* <div className="col-4 col-sm-3 col-md-2 col-lg-2 col-xl-2 ">
                        <div className="search-option-catagory card shadow rounded">
                            <SearchPage/>
                        </div>
                    </div> */}

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
            {/* <div className="float-right m-3">
                    <ul class="pagination pagination-lg">
                        <li class="page-item">
                            <a class="page-link" onClick={this.changeprev.bind(this)} disabled={this.state.showprev}>Prev</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" >{this.state.current}</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" onClick={this.changenext.bind(this)} disabled={this.state.shownext}>Next</a>
                        </li>
                    </ul>

            </div> */}
        </div>   
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