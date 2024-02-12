import React, { useEffect } from 'react'
import reportImage from '../Assests/img 1.jpg'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import { BASE_URL } from '../service/serverURL';

function IncidentCard({reports}) {

  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  return (
    <>
  
      <Card style={{width:'100%'}} className='d-flex justify-content-center align-items-center mt-4 shadow rounded btn bg-dark'onClick={handleShow}>
        <Card.Img  variant="top" style={{paddingTop:'10px'}} src={reports?`${BASE_URL}/uploads/${reports.reportImage}`:reportImage} />
        <Card.Body>
          <Card.Title style={{color:'yellow'}}>{reports.title}</Card.Title>
          <Card.Text style={{color:'white'}}>
           {reports.date}
          </Card.Text>
        </Card.Body>
      </Card>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        
      >
         <Modal.Header closeButton></Modal.Header>
         <Modal.Body>
         <Row>
            <Col md={6}>
            <h5>{reports.location}</h5>
            <h5>{reports.date}</h5>
            <img src={reports?`${BASE_URL}/uploads/${reports.reportImage
}`:reportImage} style={{width:'100%'}} alt="" />
            </Col>
            <Col md={6}>
            <h1>{reports.title}</h1>
            <p>{reports.overview}
            </p>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
  



    
    </>
  )
}

export default IncidentCard