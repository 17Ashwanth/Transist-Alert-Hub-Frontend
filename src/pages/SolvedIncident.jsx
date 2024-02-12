import React, { useEffect, useState } from 'react'
import Header2 from '../Components/Header2'
import { allSolvedReports, deleteSolvedReportsAPI } from '../service/allAPI'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import IncidentCard from '../Components/IncidentCard'
import Header from '../Components/Header'

function SolvedIncident() {
  const [searchKey,setSearchkey] = useState('') 
  const [solvedReports,setSolvedReports]= useState([])
  const [isLogin,setIsLogin]=useState(false)

  const adminDelete = ()=>{
    const result = JSON.parse(sessionStorage.getItem("existsUser"))
    if(result.email==="admin@gmail.com"){
        setIsLogin(true)
    }
  }
  
   useEffect(()=>{
   adminDelete()
},[]) 


  const getAllSolvedReports = async()=>{
    if(sessionStorage.getItem("token"))
    {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" :`Bearer ${token}`
      }
      const result = await allSolvedReports(searchKey,reqHeader)
      console.log(result);
      if(result.status === 200)
      {
        setSolvedReports(result.data)
      }
      else
      {
        console.log(result.response.data);
      }
  }
  
}
console.log(solvedReports);
   console.log(searchKey);
useEffect(()=>{
  getAllSolvedReports()
},[searchKey])
const handleDelete =async(id)=>{
  const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" :`Bearer ${token}`
      }
  await deleteSolvedReportsAPI(id,reqHeader)
  getAllSolvedReports()
}
  return (
    <>
    {isLogin? <Header/>:
    <Header2/>}
    <div className="d-flex justify-content-center mt-4">
      <h1>Solved Incident Reported </h1>
    </div>
   <div className='d-flex justify-content-between mt-3'>
    <div className='text-center mt-3 ms-3'>
      <h2>Search and find the Reports</h2>
      <form action="">
      <input className='rounded border border-bold ps-2 w-75' type="text" value={searchKey} onChange={(e)=>setSearchkey(e.target.value)}placeholder='You can type and search here...' />
          </form>
    </div>
      <div className='text-center mt-3'>
      <button className='btn btn-dark me-3' style={{borderRadius:'10px',border:'none'}}>
            <Link style={{textDecoration:'none',color:'white'}} to={'/incident'}>Back To Reports 
            </Link>
            </button>
            {isLogin && <button className='btn btn-dark me-3' style={{borderRadius:'10px',border:'none'}}>
            <Link style={{textDecoration:'none',color:'white'}} to={'/admin'}>Back to home 
            </Link>
            </button>}
      </div>
   </div>
    <hr />
    <Row className='container-fluid mb-5 mt-5'>
      {solvedReports?.length>0?
      solvedReports?.map((item)=>(<Col className='mb-3' sm={12} md={6} lg={4}>
        <IncidentCard reports={item} />
{ isLogin &&<div style={{backgroundColor:'red'}} className="d-flex justify-content-center rounded mt-1">
                  <div>
                      <button onClick={()=>handleDelete(item._id)}  className="btn mt-2"><h3><b>DELETE THE INCIDENT</b></h3> </button>
                  </div>
            </div>}
        </Col>))
        
         :<div>         
        <p style={{color:'red',fontWeight:'600px'}} className='text-center fs-3'><b>Sorry no reports currently available</b></p>: 
      </div> }

    </Row>
    
    </>
  )
}

export default SolvedIncident