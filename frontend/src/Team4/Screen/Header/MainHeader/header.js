import React, { Component } from 'react'

import {Link} from "react-router-dom";
import { Navbar, Nav, FormControl, Form, Button } from 'react-bootstrap';

import '../../../Styles/header.css'

import Headers from '../../../../Team1/components/Header'

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {searchelement : "" }
    }
    SearchElement(event) {
        let searchdata = event.target.value;
        this.setState({searchelement : searchdata})
    }

    render() {
        return (
            <div className="header-color">
                <Navbar bg="primary" expand="lg" className = "p-4" >   
                    <Navbar.Brand>
                        <Link to = {'/'}>
                           <div className="align-img-text">
                            <p className="headerName">BOOK STORE</p>
                            </div>
                        </Link>
                        </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                           <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                              <Form inline>
                              <FormControl type="text" onChange={this.SearchElement.bind(this)} placeholder="By author/title/category" className="headerSearchBar" />
                              <Link to={"/headersearchresults/"+this.state.searchelement}><Button className="headerSearchButton"><i class="fa fa-search"></i></Button></Link>
                              </Form>
                           </Navbar.Collapse>
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="justify-content-end inline headerButtons loginsignup">
                    <Nav.Link> 
                    <Headers/>
                    </Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
             </div>
        )
    }
}