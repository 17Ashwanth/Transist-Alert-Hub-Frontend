import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import admin from '../Assests/admin.svg'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthTokenContext } from '../Context/ContextShare'
import { allReportsAPI, allSolvedReports } from '../service/allAPI'

function Admin() {
  const [totalReport,setTotalReport]=useState([])
 const [solvedReport,setSolvedReport]=useState([])
  const {isAuthenticated, setIsAuthenticated}=useContext(isAuthTokenContext)
  const navigate = useNavigate()

  const handleReportCount = async()=>{
    if(sessionStorage.getItem("token"))
    {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" :`Bearer ${token}`
      }
      const result = await allReportsAPI('',reqHeader)
      console.log(result);
      if(result.status === 200)
      {
        setTotalReport(result.data)
      }
      else
      {
        console.log(result.response.data);
      }
    }
  }
 console.log(totalReport);

 const handleSolvedReportCount = async()=>{
  if(sessionStorage.getItem("token"))
  {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type" : "application/json",
      "Authorization" :`Bearer ${token}`
    }
    const result = await allSolvedReports('',reqHeader)
    console.log(result);
    if(result.status === 200)
    {
      setSolvedReport(result.data)
    }
    else
    {
      console.log(result.response.data);
    }
}
 }
 console.log(solvedReport);

 useEffect(()=>{
handleReportCount()
handleSolvedReportCount()
 },[])
 
  const handleLogout =()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existsUser")
    navigate('/login')
    setIsAuthenticated(false)

  }
  return (
    <>
    <Header/>
    <div style={{backgroundColor:'black'}} className=" mt-5 w-75 container rounded p-5 mb-5">
            <div className="row align-items-center">
              <Row>
                <Col lg="6">
                  <h3 className="text-center text-light">
                  "Welcome to Transist Alert Hub Admin: Your Central Command for Seamless Transit Management!"</h3>
                  <div className='d-flex justify-content-between mt-4'>
                  <div className="border mt-3 rounded-3 " style={{backgroundColor:'black'}}>
                            <h3 className="text-white m-0 p-4">
                                Total REPORTS :
                                {totalReport.length}
                            </h3>
                  </div>
                  <div className="border ms-5 mt-3 rounded-3 " style={{backgroundColor:'black'}}>
                            <h3 className="text-white m-0 p-4">
                                Solved REPORTS : 
                                {solvedReport.length}
                            </h3>
                  </div>
                  </div>
                  <div className='d-flex justify-content-center me-3'>
                  <button onClick={handleLogout} className='btn btn-dark rounded  ms-4 mt-4'>LOG OUT</button>
                  </div>
                </Col>
                <Col lg='6'>
                  <div className="d-flex align-items-center justify-content-center flex-column">
                  <div className='d-flex justify-content-center'>
                    <img className='mt-3' width={'300px'} src={admin} alt="" />
                  
                  </div>
                  <div className='d-flex justify-content-between'>
                    <div><Link to={'/incident'}><button className='btn btn-dark rounded  ms-4 mt-4'>REPORTS</button></Link></div>
                    <div><Link to={'/solved-incident'}><button className='btn btn-dark rounded  ms-4 mt-4'>SOLVED REPORTS</button></Link></div>
                  </div>

                  </div>
                </Col>
              </Row>
                
              </div>
    </div>
    
    </>
  )
}

export default Admin