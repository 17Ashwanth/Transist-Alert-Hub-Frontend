import React, { useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addReportAPI } from '../service/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import { addReportResponseContext } from '../Context/ContextShare';
import addimage from '../Assests/addimage.svg'


function AddIncident() {
  const {addReportResponse, setAddReportResponse} = useContext(addReportResponseContext)
  const [reportDetails, setreportDetails]=useState({
    title:"",
    date: new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date()),
    location:"",
    overview:"",
    reportImage:""
})
const [token,seToken] = useState("")
const [ preview, setPreview]=useState("")
const handleShow = () => setShow(true);
const [show, setShow] = useState(false);

useEffect(()=>{
  if(sessionStorage.getItem("token")) 
    {
      seToken(sessionStorage.getItem("token"))
    }
},[])

useEffect(()=>{
  if(reportDetails.reportImage)
  {
      setPreview(URL.createObjectURL(reportDetails.reportImage))
  } 

  },[reportDetails.reportImage])
  console.log(preview);

  const handleClose = () => {
    setShow(false)
    handleClosed()
    
}

const handleClosed =()=>{
    setreportDetails({
        title:"",
        date:"",
        location:"",
        overview:"",
        reportImage:""
    })
    setPreview("")
}

const handleAdd = async (e)=>{
  e.preventDefault();
  const {title,
  date ,
  location,
  overview,
  reportImage}= reportDetails

  if(!title  || !location || !overview || !reportImage){
      toast.info("Please fill out all fields.")
  }
  else
  {
    // reqbody

    //1) create an object of form data class since we have uploaded contnet
    const reqBody = new FormData()

    //2) add data - append() --can add only single item.
    reqBody.append("title",title)
    reqBody.append("date",date)
    reqBody.append("location",location)
    reqBody.append("overview",overview)
    reqBody.append("reportImage",reportImage)

    //reqHeader
    if(token)
    {
      const reqHeader = {
        "Content-Type" : "multipart/form-data",
        "Authorization" :`Bearer ${token}`
      }

      const result = await addReportAPI(reqBody,reqHeader)
      console.log(result);
       if(result.status === 200)
      { console.log(result);
        toast.success("Report Added Succesfully");
        handleClose()
        setAddReportResponse(result.data)
      }
      else
      {
        toast.error('Failed to Add Report',result.response.data)
        handleClosed()
      } 

    }
    
      
  }
}

console.log(reportDetails);




  return (
    <>
    
    <Button variant="dark" onClick={handleShow}>
      Add Reports
    </Button>

    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Title className='text-center mt-2'>Add Report</Modal.Title>
      <Modal.Body>
        <div className="row">
            <div className="col-lg-6">
                <label htmlFor='upload'>
                    <input id='upload' onChange={(e)=>setreportDetails({...reportDetails,reportImage:e.target.files[0]})}  type="file" style={{display:'none'}} />
                    <img width={'100%'} height={'100%'} className='img-fluid' src={preview?preview:addimage} alt="" />
                </label>
            
            </div>
            <div className="col-lg-6">
                <div className=" mt-2 mb-3 w-100">
                    <input value={reportDetails.title} onChange={(e)=>setreportDetails({...reportDetails,title:e.target.value})} type="text" className="form-control" placeholder='What Incident?' />
                </div>
             
                <div className=" mt-2 mb-3 w-100">
                    <input value={reportDetails.location} onChange={(e)=>setreportDetails({...reportDetails,location:e.target.value})}  type="text" className="form-control" placeholder='Location'/>
                </div>
                <div className=" mt-2 mb-3 w-100">
                    <textarea value={reportDetails.overview} onChange={(e)=>setreportDetails({...reportDetails,overview:e.target.value})}  className='form-control' name='' id='' cols="30" rows="3" placeholder='Incident Overview' />
                </div>
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button  onClick={handleClosed}>
          Cancel
        </Button>
        <Button  onClick={handleAdd}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
    <ToastContainer theme='colored' autoClose={3000} position='top-center' />
    </>
  )
}

export default AddIncident