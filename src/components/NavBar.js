import React from 'react';
import {
    Navbar,
    Nav,
} from 'react-bootstrap';

const NavBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Shop</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {JSON.parse(localStorage.getItem('token')) !== '' ? (
                        <Nav.Link href="/orders">Orders</Nav.Link>
                    ) : (
                            <></>
                        )}
                    {JSON.parse(localStorage.getItem('role')) === 'ROLE_ADMIN' ? (
                        <Nav.Link href="/admin">Admin panel</Nav.Link>

                    ) : (
                            <></>
                        )}
                </Nav>
                <Nav>
                    {JSON.parse(localStorage.getItem('token')) !== '' ? (
                        <Nav.Link href="/login" onClick={() => {
                            localStorage.setItem('token', JSON.stringify(''));
                            localStorage.setItem('role', JSON.stringify(''));
                        }}>Logout</Nav.Link>
                    ) : (
                            <Nav.Link href="/login">Login</Nav.Link>
                        )}
                    <Nav.Link href="/cart">Cart</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
