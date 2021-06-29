import React, { Component } from 'react'
import {Link} from "react-router-dom";
import {FormControl, Form, Button } from 'react-bootstrap';

import '../../../Styles/secondheader.css';


export default class SecondHeader extends Component {
    constructor(props){
        super(props);
        this.state = {booksData: [], filterData : [], wordEntered: "" }
    }

    componentDidMount(){
        fetch('http://localhost:4000'+'/books',{
            headers:{'content-type': 'application/json'},
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({booksData : data.data})
        });
        
   }

    render() {
        console.log("Search Data: ",this.state.booksData);   

        const handleFilter = (event) => {
            const searchWord = event.target.value;
            this.setState({wordEntered : searchWord});
            const newFilter = this.state.booksData.filter((value) => {
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
            {/* <Router> */}
           
                <nav className="navbar navbar-expand-lg navbar-light p-3">
                    <div id="navbarNavDropdown">
                        <ul className="navbar-nav my-1">
                        <div className="changelinksize">
                            <div>
                            <Link to={"/allbookspage"}><Button variant="outline-primary border-0">All</Button></Link>
                            <Link to={"/todaydealspage"}><Button variant="outline-primary border-0">Today Deals</Button></Link>
                            <Link to={"/newrelease"}><Button variant="outline-primary border-0">New Releases</Button></Link>
                            <Link to={"/popularpage"}><Button variant="outline-primary border-0">Popular Books</Button></Link>
                            </div>

                           
                        

                            <div className="search">
                                <div className="searchInputs">
                                <Form inline>
                                    <FormControl type="text" onChange={handleFilter} value={this.state.wordEntered} placeholder="Search by book name"  />
                                </Form>
                                    {this.state.wordEntered.length === 0 ? (
                                        <i class="fa fa-search searchIcon"></i>
                                    ) : (
                                        <i id="clearBtn" class="fa fa-close searchIcon" onClick={clearInput}></i>
                                    )}
                                </div>
                                {this.state.filterData.length != 0 && (
                                    <div className="dataResult">
                                        {this.state.filterData.map((value, key) => {
                                            return (
                                                <Link to= {{pathname : '/description', query : value}}>
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
                
                
            {/* </Router> */}
            
            </>
        )
    }
}

                                    {/* <Link to={"/headersearchresults/"+this.state.searchelement}><Button className="headerSearchButton"><i class="fa fa-search"></i></Button></Link> */}
                                    {/* <input type="text" placeholder="Search by book name" value={this.state.wordEntered} onChange={handleFilter}/> */}
