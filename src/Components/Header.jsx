import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import React, { useContext, useEffect, useState } from 'react'
import '../index.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../Context/ContextShare';


function Header() {
  const [isLogin,setIsLogin] = useState(false)
    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsLogin(true)
            adminLogout()
        }  
    },[])
    const adminLogout = ()=>{
      const result = JSON.parse(sessionStorage.getItem("existsUser"))
      if(result.email==="admin@gmail.com"){
          setIsLogin(false)
      }
    } 
  
    const {isAuthenticated, setIsAuthenticated}=useContext(isAuthTokenContext)
    const navigate = useNavigate()
    const handleLogout =()=>{
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("existsUser")
      navigate('/login')
      setIsAuthenticated(false)
    }
  return (
    <>
<div className='header-body text-decoration-none'>
         <Navbar style={{backgroundColor:'black'}} expand="lg">
      <Container>
      <Navbar.Brand className='ms-3 text-white' href="/"><i style={{color:'white'}} class="fa-solid fa-circle-exclamation fs-2 me-2"></i>  TRANSIT ALERTS HUB</Navbar.Brand>        
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className=" d-flex align-items-center ms-4">
          <Nav.Link className='mt-2'> 
            <a href="" target='_blank'><i style={{color:'white'}} class="fa-brands fa-facebook fs-2 me-5 ms-4"></i></a>
            <a href="" target='_blank'><i style={{color:'white'}} class="fa-brands fa-twitter fs-2 me-5"></i></a>
            <a href="" target='_blank'><i style={{color:'white'}} class="fa-solid fa-envelope fs-2 me-5"></i></a>
            <a href="" target='_blank'><i style={{color:'white'}} class="fa-brands fa-instagram  fs-2 me-5"></i></a>  
         </Nav.Link> 
         {isLogin&& <Nav.Link>
            <Link to={'/login'}> <Button onClick={handleLogout} className='btn btn-light me-5'  type="">Log Out</Button></Link> 
          </Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
</div>



    </>
  )
}

export default Header