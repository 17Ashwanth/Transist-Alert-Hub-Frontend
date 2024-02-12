import React,{ useContext,useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { editReportsAPI } from '../service/allAPI';
import { editReportResponseContext } from '../Context/ContextShare';
import { BASE_URL } from '../service/serverURL';
import { ToastContainer, toast } from 'react-toastify';


function EditIncident({reports}) {
    const {editReportResponse, setEditReportResponse} = useContext(editReportResponseContext)

    const [show, setShow] = useState(false);
    //state to hold the values of inputbox
    const [reportDetails, setreportDetails]=useState({
        id:reports._id,
        title:reports.title,
        date:reports.date,
        location:reports.location,
        overview:reports.overview,
        reportImage:""
    })
    const [ preview, setPreview]=useState("")

    const handleClose = () => {
        setShow(false)
        handleClosed()
        
    }

    const handleClosed =()=>{
        setreportDetails({
            id:reports._id,
            title:reports.title,
            date:reports.date,
            location:reports.location,
            overview:reports.overview,
            reportImage:""

        })
        setPreview("")
    }

    const handleShow = () => setShow(true);

    useEffect(()=>{
        if(reportDetails.reportImage)
        {
            setPreview(URL.createObjectURL(reportDetails.reportImage))
        } 
      
        },[reportDetails.reportImage])
        console.log(preview);

        const handleUpdate =async(e)=>{
            e.preventDefault();
            const {id,title,
            date,
            location,
            overview,
            reportImage}= reportDetails
    
            if(!title || !location || !overview){
                toast.info("Please fill out all fields.")
            }
            else
            {
                
    const reqBody = new FormData()

    reqBody.append("title",title)
    reqBody.append("date",date)
    reqBody.append("location",location)
    reqBody.append("overview",overview)
    preview?reqBody.append("reportImage",reportImage):reqBody.append("reportImage",reports.reportImage) 
    
    
    const token = sessionStorage.getItem("token")

    
                if(preview)
                {
                    const reqHeader = {
                        "Content-Type" : "multipart/form-data",
                        "Authorization" :`Bearer ${token}`
                      }
                    
                      const result = await editReportsAPI(id,reqBody,reqHeader)
                      console.log(result);
                      if(result.status === 200)
                      {
                        toast.success('updated successfully')
                        handleClose()
                        setEditReportResponse(result.data)
                      }
                      else
                      {
                        console.log(result.response.data);
                      }
                }
                else
                {
                    const reqHeader = {
                        "Content-Type" : "application/json",
                        "Authorization" :`Bearer ${token}`
                      }
        
                      const result = await editReportsAPI(id,reqBody,reqHeader)
                      console.log(result);
                      if(result.status === 200)
                      {
                        toast.success('updated successfully')
                        handleClose()
                        setEditReportResponse(result.data)
                      }
                      else
                      {
                        console.log(result.response.data);
                      }
                }
            }
    
           
        }

  return (
    <>
    <button onClick={handleShow} className="btn mt-2"><i style={{fontSize:'30px',color:'black'}} class="fa-solid fa-pen-to-square"></i></button>

    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Title className='text-center mt-2'>Edit Report</Modal.Title>
      <Modal.Body>
        <div className="row">
            <div className="col-lg-6">
                <label htmlFor='upload'>
                    <input id='upload' onChange={(e)=>setreportDetails({...reportDetails,reportImage:e.target.files[0]})}  type="file" style={{display:'none'}} />
                    <img width={'100%'} height={'100%'} className='img-fluid' src={preview?preview:`${BASE_URL}/uploads/${reports.reportImage}`} alt="" />
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
        <Button  onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
    <ToastContainer theme='colored' autoClose={3000} position='top-center' />


    </>
  )
}

export default EditIncident