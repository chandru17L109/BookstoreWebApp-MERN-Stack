import React, { Component } from 'react'
import {FormControl, Form, Button } from 'react-bootstrap';
import {Link} from "react-router-dom";

import '../../../Styles/secondheader.css';

import * as actions from '../../../action/action'
import {connect} from 'react-redux';

class SecondHeader extends Component {
    constructor(props){
        super(props);
        this.state = {filterData : [], wordEntered: "" }
    }

    componentDidMount(){
        this.props.onFetchBooklistTitle();
   }

    render() {
        const handleFilter = (event) => {
            const searchWord = event.target.value;
            this.setState({wordEntered : searchWord});
            const newFilter = this.props.booksData.filter((value) => {
                return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });
        
        if (searchWord === "") {
            this.setState({filterData : []});
        } else {
            this.setState({filterData : newFilter});
        }};

        const clearInput = () => {
            this.setState({filterData : []});
            this.setState({wordEntered : ""});
          };
        
        return (
            <>           
                <nav className="navbar navbar-expand-lg navbar-light p-3">
                    <div id="navbarNavDropdown">
                        <ul className="navbar-nav my-1">
                        <div className="changelinksize">
                            <div>
                            <Link to={"/allbookspage"}><Button variant="outline-primary border-0 my-1">All</Button></Link>
                            <Link to={"/todaydealspage"}><Button variant="outline-primary border-0 my-1">Today Deals</Button></Link>
                            <Link to={"/newrelease"}><Button variant="outline-primary border-0 my-1">New Releases</Button></Link>
                            <Link to={"/popularpage"}><Button variant="outline-primary border-0 my-1">Top Rated</Button></Link>
                            </div>

                            <div className="search ml-1">
                                <div className="searchInputs">
                                <Form inline>
                                    <FormControl type="text" onChange={handleFilter} value={this.state.wordEntered} placeholder="Search by book title"  />
                                </Form>
                                    {this.state.wordEntered.length === 0 ? (
                                        <i class="fa fa-search searchIcon"></i>
                                    ) : (
                                        <i id="clearBtn" class="fa fa-close searchIcon" onClick={clearInput}></i>
                                    )}
                                </div>
                                
                                {this.state.filterData.length !== 0 && (
                                    <div className="dataResult">
                                        {this.state.filterData.slice(0,4).map((value, key) => {
                                            return (
                                                <Link to= {'/description/'+value._id}>
                                                    <p onClick={clearInput}>{value.title} </p>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                            </div>
                        </ul>
                    </div>
                </nav>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        booksData : state.BookReducer.booksearchtitle,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        onFetchBooklistTitle : () => dispatch(actions.FetchBookSearchByTitle())
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SecondHeader);




