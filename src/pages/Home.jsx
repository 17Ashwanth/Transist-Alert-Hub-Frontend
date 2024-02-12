import React, { useContext, useEffect, useState } from 'react'
import HomeCarousel from '../Components/HomeCarousel'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import img1 from '../Assests/home.svg'
import IncidentCard from '../Components/IncidentCard'
import Header from '../Components/Header'
import { homeReportsAPI } from '../service/allAPI'
import { isAuthTokenContext } from '../Context/ContextShare'


function Home() {
    const {isAuthenticated, setIsAuthenticated}=useContext(isAuthTokenContext)
    const [homeReports,setHomeReports] = useState([])
    const [isLogin,setIsLogin] = useState(false)
    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsLogin(true)
        }
    },[])

    const getHomeReports = async()=>{
        const result = await homeReportsAPI()
        console.log(result.data);
        setHomeReports(result.data)
     }
    useEffect(()=>{
        getHomeReports()
    },[])

  return (
    <>
    <Header/>
    <HomeCarousel/>
        <div style={{width:'100%',height:'100vh',backgroundColor:'black'}}>
            <div className="container-fluid rounded">
                <Row className='d-flex justify-content-center align-items-center p-5'>
                    <Col sm={12} lg={6}>
                        <h1 className='display-4' style={{color:'white'}}>TRANSIT ALERTS HUB</h1>
                        <p className='lead fw-bold' style={{color:'white'}}>Welcome to TransitAlerts Hub, Where community driven collaboration meets seamless public transportation experiences.Be part of the TransitAlerts Hub community,Where every report makes a difference. Your journey, your voice!</p>
                        {isLogin ?              
                        <Link to={'/dashboard'}>
                        <button onClick={()=>setIsAuthenticated(true)}  className='btn btn-outline-light rounded'>Go to Your Reports  <i class="fa-solid fa-arrow-right 2s-3"></i> </button>
                        </Link>: 
                        <Link to={'/register'}>
                        <button   className='btn btn-outline-light rounded'>Take The First Step  <i class="fa-solid fa-arrow-right 2s-3"></i> </button>
                        </Link>}             
                     </Col>
                     <Col className='d-none d-lg-block' sm={12} lg={6} >
                        <img width={'100%'} src={img1} alt="no-imge"/>
                    </Col>
                </Row>
            </div>
        </div>
    <div className="mt-5 mb-5">
        <h1 className="text-center">Incidents Reported</h1>
        <div className="d-flex">
                
            { homeReports?.length>0?
              homeReports?.map((item)=>(<Row>
                <Col md={4}>
                    <div className='mt-3 ms-3' style={{width:'500px'}}>
                    <IncidentCard reports={item}/>
                    </div>
                </Col>        
                      
                    
            </Row>)):
            null 
                
            }
        </div>

        <div className='text-center mt-5'>
           {isLogin&& <button  className='btn btn-dark' style={{borderRadius:'10px',border:'none'}}>
            <Link style={{textDecoration:'none',color:'white'}} to={'/incident'}>See More Reports  
            </Link>
            </button>}
        </div>
    </div>
    
    </>
  )
}

export default Home


