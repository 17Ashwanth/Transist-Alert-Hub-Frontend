import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react'
import '../index.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function Header2() {
  return (
    <>
<div className='header-body text-decoration-none'>
         <Navbar style={{backgroundColor:'black'}} expand="lg">
      <Container>
      <Navbar.Brand className='ms-3 text-white' href="/"><i style={{color:'white'}} class="fa-solid fa-circle-exclamation fs-2 me-2"></i>  TRANSIT ALERTS HUB</Navbar.Brand>        
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-4 d-flex align-items-center">
            <Nav.Link className='text-white mt-2 me-5' href={'/'}>Home</Nav.Link>
            <Nav.Link className='text-white mt-2 me-5 ' href={'/incident'}>Reports</Nav.Link>
            <Nav.Link className='text-white mt-2 me-5' href={'/dashboard'}>Dashboard</Nav.Link>
            <Nav.Link className='text-white mt-2 me-5' href={'/profile'}>My Profile</Nav.Link>              
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
</div>



    </>
  )
}

export default Header2