import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'
import mainlogo from '../Assests/home.png';
import { Col, Row } from 'react-bootstrap';


function Footer() {
  return (
    <div style={{backgroundColor:'black'}}  className='footer-body p-5 justify-content-center align-items-center w-100 flex-column mt-4'>
  <Row>
      
      <Col md={4} sm={12}>
        <div className="website ">
        <h4 class='mb-3 fw-semibold text-white'>
        <img style={{width:'80px',marginRight:'20px',}} src={mainlogo} alt="" className='rounded-3'/>Transist Alert Hub
        </h4>
        <h6 className='text-light ' style={{textAlign:'justify'}}>TransitAlerts Hub is your go-to platform for real-time incident reporting and updates within the public transport network. <br /> <br /> Empowering commuters to be the eyes and ears of their transit community, TransitAlerts Hub allows users to swiftly report incidents, delays, or issues, helping transportation authorities respond promptly. <br /> <br /> Seamlessly integrating user reports with a dynamic map interface, our platform enhances communication between commuters and authorities..</h6>
        </div>
      </Col>
  
      <Col md={2} sm={12}>
        <div className="links d-flex flex-column mt-3">
          <h4 className='mb-3 text-white fw-semibold '>Emergency</h4>
          <li className='text-white fw-semibold ' style={{listStyle:'none'}}><i style={{color:'white'}} class="fa-solid fa-phone fs-5"></i>  Ambulance</li>
          <li className='text-white fw-semibold ' style={{listStyle:'none'}}><i style={{color:'white'}} class="fa-solid fa-phone fs-5"></i>  Police</li>
          <li className='text-white fw-semibold ' style={{listStyle:'none'}}><i style={{color:'white'}} class="fa-solid fa-phone fs-5"></i>  Fire Agency</li>

        </div>
      </Col>
  
      <Col md={2} sm={12}>
        <div className="guid d-flex flex-column mt-3">
        <h4 className='mb-3 text-white fw-semibold '>supports</h4>
          <Link className='foot-links fw-semibold ' style={{textDecoration:'none',color:'white'}}>About us</Link>
          <Link className='foot-links fw-semibold ' style={{textDecoration:'none',color:'white'}}>Privacy and Policy</Link>
          <Link className='foot-links fw-semibold ' style={{textDecoration:'none',color:'white'}}>terms and conditions</Link>
          <Link className='foot-links fw-semibold ' style={{textDecoration:'none',color:'white'}}>FAQ's</Link>
          <Link className='foot-links fw-semibold ' style={{textDecoration:'none',color:'white'}}>Help center</Link>
        </div>
      </Col>
  
      <Col md={4} sm={12}>
        <div className="contact  d-flex flex-column mt-3">
          <h4 className='mb-3 text-white'>contact us</h4>
          <div className='d-flex mb-3'>
            <input type="text" className='form-control' placeholder='Enter your Email' />
            <button className='btn btn-light text-dark ms-2'>Submit</button>
          </div>
    
          <div className='foot-icons d-flex justify-content-evenly align-item-center'>
           <Link  style={{textDecoration:'none',color:'white' }}><i class="fa-brands fa-facebook fa-2x"></i></Link>
           <Link  style={{textDecoration:'none',color:'white' }}><i class="fa-brands fa-twitter fa-2x"></i></Link>
           <Link  style={{textDecoration:'none',color:'white' }}><i class="fa-solid fa-envelope fa-2x"></i></Link>
           <Link  style={{textDecoration:'none',color:'white' }}><i class="fa-brands fa-instagram fa-2x"></i></Link>
         </div>
        </div>
      </Col>
    
  </Row>
   <div className='text-center text-white fw-semibold '> <p className='mt-5'>Copyright 2024 Transist Alerts Hub </p></div>
  </div>
  )
}

export default Footer

// Visruth