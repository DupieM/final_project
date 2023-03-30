import React from "react";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import logo from './logo.svg';

function BasicNavbar() {
    return (
        <Navbar variant="dark" style={{backgroundColor: '#577D92', padding: '0'}}>
            <Container style={{textAlign: 'left'}}>
                <Navbar.Brand href="/"><img src={logo} style={{width: '17%'}}/></Navbar.Brand>
                <Nav>
                    <Nav.Link href="/compare" style={{fontSize: '17pt', color: '#373737', fontWeight: 'bold'}}>Compare</Nav.Link>
                    <Nav.Link href="/time" style={{fontSize: '17pt', color: '#373737', fontWeight: 'bold'}}>Timeline</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default BasicNavbar;