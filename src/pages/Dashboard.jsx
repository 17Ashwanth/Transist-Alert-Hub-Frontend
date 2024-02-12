import React, { useContext, useEffect, useState } from 'react'
import AddIncident from '../Components/AddIncident'
import IncidentCard from '../Components/IncidentCard'
import Header2 from '../Components/Header2'
import { Col, Row } from 'react-bootstrap'
import { deleteUserReportsAPI, userReportsAPI } from '../service/allAPI'
import { addReportResponseContext, editReportResponseContext } from '../Context/ContextShare'
import EditIncident from '../Components/EditIncident'



function Dashboard() {
  
  const {addReportResponse}=useContext(addReportResponseContext)

  const {editReportResponse}=useContext(editReportResponseContext)

  const [username, setUsername] = useState("")

  const [userReports, setuserReports]= useState([])


  const handleDelete = async(id)=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type" : "application/json",
      "Authorization" :`Bearer ${token}`
    }
    const result = await deleteUserReportsAPI(id,reqHeader)
    console.log(result);
    if(result.status===200)
    {
      getUserReports()
    }
    else
    {
      console.log(result.response.data);
    }
  }


  const getUserReports = async()=>{

    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type" : "application/json",
      "Authorization" :`Bearer ${token}`
    }

    const result = await userReportsAPI(reqHeader)
    console.log(result.data);
    setuserReports(result.data)

  }

  useEffect(()=>{
    getUserReports()
  },[ addReportResponse,editReportResponse])

 useEffect(()=>{
    setUsername(JSON.parse(sessionStorage.getItem("existsUser")).username)
 },[])

  return (
    <>
    <Header2/>
    <div className=" d-flex justify-content-center align-items-center mt-5">
        <h1><b>Welcome <span style={{color:'black'}}>{username}</span></b></h1>
    </div>
    <div className=" d-flex justify-content-center align-items-center mt-2" ><AddIncident/></div>
    <div className="ms-2 mt-4">
      <h1><b>My Reports</b><hr /></h1>
    </div>
    <div className="d-flex">
                
                <Row>
                    
                        {userReports?.length>0?
                        userReports?.map((item)=>(<Col md={4}>
                        <div  className='mt-3' style={{width:'450px',marginRight:'250px',marginLeft:'18px'}}>
                        <IncidentCard reports={item}/>
                        <div style={{backgroundColor:'yellow'}} className="d-flex justify-content-between rounded mt-1">
                        <div>
                          <EditIncident reports={item}/>
                        </div>
                        <div>
                          <button onClick={()=>handleDelete(item._id)} className="btn mt-2"><i style={{fontSize:'30px',color:'black'}} class="fa-solid fa-trash"></i></button>
                        </div>
                        </div>
                        
                        </div></Col>)):
                       <p className="text-danger fs-1"><b>No Reports Uploaded yet!!</b></p> }
                </Row>
            </div>


    

    
    </>
  )
}

export default Dashboard