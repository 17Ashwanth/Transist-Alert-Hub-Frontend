import React,{ useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import IncidentCard from '../Components/IncidentCard'
import { Link } from 'react-router-dom'
import Header2 from '../Components/Header2'
import { addSolvedReportAPI, allReportsAPI, deleteUserReportsAPI} from '../service/allAPI'
import Header from '../Components/Header'

function Incident() {
  const [isToken, setisToken]= useState(false)
  const [searchKey,setSearchkey] = useState('') 
  const [allReports,setAllReports]= useState([])
  const [isLogin,setIsLogin]=useState(false)

  const adminSolve = ()=>{
    const result = JSON.parse(sessionStorage.getItem("existsUser"))
    if(result.email==="admin@gmail.com"){
        setIsLogin(true)
    }
  }
  
   useEffect(()=>{
   adminSolve()
},[]) 

const handleSolve= async(reqBody)=>{
  const token = sessionStorage.getItem("token")
  const reqHeader = {
    "Content-Type" : "application/json",
    "Authorization" :`Bearer ${token}`
  }
  const result = await addSolvedReportAPI(reqBody,reqHeader)
  console.log(result);
   await deleteUserReportsAPI(reqBody._id,reqHeader)
   getAllReports()
 }


  const getAllReports = async()=>{
    if(sessionStorage.getItem("token"))
    {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" :`Bearer ${token}`
      }
      const result = await allReportsAPI(searchKey,reqHeader)
      console.log(result);
      if(result.status === 200)
      {
        setAllReports(result.data)
      }
      else
      {
        console.log(result.response.data);
      }
    }
  }
  console.log(allReports);
   console.log(searchKey);
  useEffect(()=>{
    getAllReports()
  },[searchKey])

   useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setisToken(true)
    }
  }) 


 
  return (
    <>
    {isLogin? <Header/>:
    <Header2/>}
    <div className="d-flex justify-content-center mt-4">
      <h1>All Incident Reported </h1>
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
            <Link style={{textDecoration:'none',color:'white'}} to={'/solved-incident'}>Solved Reports 
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
      {allReports?.length>0?
      allReports?.map((item)=>(<Col className='mb-3' sm={12} md={6} lg={4}>
        <IncidentCard reports={item} />
{ isLogin &&<div style={{backgroundColor:'yellow'}} className="d-flex justify-content-center rounded mt-1">
                  <div>
                      <button onClick={()=>handleSolve(item)} className="btn mt-2"><h3><b>SOLVE THE INCIDENT</b></h3> </button>
                  </div>
            </div>}
        </Col>))
        
         :<div>
         {isToken? 
        <p style={{color:'red',fontWeight:'600px'}} className='text-center fs-3'><b>Sorry no reports currently available</b></p>
        :
        <div className='d-flex justify-content-center align-items-center flex-column'>
        <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" height={'200px'} width={'200px'} alt="" />
         <p className='fs-3 mt-4 text-danger'><b>Please</b> <Link style={{textDecoration:'none',color:'blue'}} to={'/login'}><b>login</b> </Link><b>to see more project</b></p> 
      </div> }
      </div> }

    </Row>
    </>
  )
}

export default Incident