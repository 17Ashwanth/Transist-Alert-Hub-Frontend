import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../Assests/img 1.jpg'
import img2 from '../Assests/img 2.jpg'
import img3 from '../Assests/img 3.jpg'

function HomeCarousel() {
  return (
    <>

<div className="">
    <Carousel>
      <Carousel.Item>
        <img style={{height:'80vh'}}
        className='d-block w-100'
        src={img1} 
        alt="" />
        <Carousel.Caption>
          <div className='rounded' style={{backgroundColor:'black'}}><h3 style={{color:'yellow',fontWeight:'900',fontSize:'40px'}}>Navigating Urban Gridlock: <br></br> Strategies for Dealing with Daily Traffic Jams</h3></div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img style={{height:'80vh'}}
        className='d-block w-100'
        src={img3}
        alt="" />
        <Carousel.Caption>
          <div className='rounded' style={{backgroundColor:'black'}}><h3 style={{color:'yellow',fontWeight:'900',fontSize:'40px'}} >On Track Together: <br></br> Community Driven Solutions for Efficient Rail Networks</h3></div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img style={{height:'80vh'}}
        className='d-block w-100'
        src={img2} 
        alt="" />        
        <Carousel.Caption>
          <div className='rounded' style={{backgroundColor:'black'}}><h3 style={{color:'yellow',fontWeight:'900',fontSize:'40px'}}>Decoding Traffic Bottlenecks: <br /> Unraveling the Causes and Finding Solutions</h3></div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>


    </>
  )
}

export default HomeCarousel