import React from 'react'
import { Navbar, FormControl, Nav, Form, Button, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
    return (
        <>
            <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary" expand="lg">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand className="navbar-brand" style={{ fontSize: "30px" }}>Book Store</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer to="/wishlist">
                                <Nav.Link ><i className="fas fa-heart"></i> &nbsp;My Wishlist</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/cart">
                                <Nav.Link ><i className="fas fa-shopping-cart"></i> &nbsp;Cart</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/signin">
                                <Nav.Link ><i className="fas fa-user"></i> &nbsp;Sign In</Nav.Link>
                            </LinkContainer>

                        </Nav>
                        <Form className="d-flex ml-auto">
                            <FormControl className="form-control me-sm-2" type="text" placeholder="Search Products" style={{ height: "50px" }} className="mr-sm-2" />
                            <Button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</Button>
                        </Form>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header
