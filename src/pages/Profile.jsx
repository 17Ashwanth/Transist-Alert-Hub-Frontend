import React, { useEffect, useState } from 'react'
import Header2 from '../Components/Header2'
import profile from '../Assests/profile side.svg'
import { Col, Row } from 'react-bootstrap'
import avatar from '../Assests/undraw_male_avatar_g98d.svg'
import { BASE_URL } from '../service/serverURL';
import { ToastContainer, toast } from 'react-toastify';
import { editProfileAPI } from '../service/allAPI'


function Profile() {
  const [userProfile, setUserProfile]= useState({
    username:"",
    email:"",
    password:"",
    profile:""

  })
  const [isUpdate,setIsUpdate] = useState(false)
  const [existingImage,setExistingImage]=useState("")
  const [preview,setpreview]= useState("")

  useEffect(()=>{
    const user = JSON.parse(sessionStorage.getItem("existsUser"))

    setUserProfile({...userProfile,username:user.username,email:user.email,password:user.password,profile:""})

    setExistingImage(user.profile)

  },[isUpdate])

  useEffect(()=>{
    if(userProfile.profile){
      setpreview(URL.createObjectURL(userProfile.profile))
    }
    else
    {
      setpreview("")
    }
  },[userProfile.profile])

  const handleProfileUpdate = async()=>{
    const {username,email,password,profile}=userProfile

    if(!username)
    {
      toast.info("Please fill the form compltely")
    }
    else
    {
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      preview?reqBody.append("profile",profile):reqBody.append("profile",existingImage)

      const token = sessionStorage.getItem("token")
    if(preview){
      const reqHeader = {
        "Content-Type" : "multipart/form-data",
        "Authorization" :`Bearer ${token}`
      }
      const result = await editProfileAPI(reqBody,reqHeader)
      console.log(result);
      if(result.status === 200){
        toast.success("Profile Updated Succesfully!")
        sessionStorage.setItem("existsUser",JSON.stringify(result.data))
        setIsUpdate(true)
      }
      else{
        console.log(result.response.data);
      }
    }
    else{
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" :`Bearer ${token}`
      }
      const result = await editProfileAPI(reqBody,reqHeader)
      console.log(result);
      if(result.status === 200){
        toast.success("Profile Updated Succesfully!")
        sessionStorage.setItem("existsUser",JSON.stringify(result.data))
        setIsUpdate(true)
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
    <Header2/>
    <div style={{backgroundColor:'black'}} className=" mt-5 w-75 container rounded p-5 mb-5">
            <div className="row align-items-center">
              <Row>
                <Col className='d-flex  align-items-center' lg="6">
                  <h3 className="text-center text-light">
                  <h1 className='text-center text-light mb-5'>TRANSIST ALERT HUB</h1>
                    "Revolutionize Your Profile: Transform, Update, and Stay Ahead with Transist Alert Hub!"</h3>
                </Col>
                <Col lg='6'>
                  <div className="d-flex align-items-center justify-content-center flex-column">
                  <h1 className='ms-3 mt-4 text-white' href="/">PROFILE</h1>
                  <div className='d-flex justify-content-center'>
                  <label htmlFor='profile'>
                    <input  onChange={(e)=>setUserProfile({...userProfile,profile:e.target.files[0]})}  type="file" id='profile' style={{display:'none'}} />
                    {existingImage==""?<img className='mt-5 ms-5 rounded-circle' height={'250px'} width={'250px'} src={preview?preview:avatar} alt="no image"  />:
                    <img className='mt-5 ms-5 rounded-circle' height={'250px'} width={'250px'} src={preview?preview:`${BASE_URL}/uploads/${existingImage}`} alt="no image"  />}
                  </label>
                  </div>
                  <div className="mt-5 ms-5">
                    <input value={userProfile.username} onChange={(e)=>setUserProfile({...userProfile,username:e.target.value})} className='form-control rounded' type="text" placeholder='username' />
                  </div>
                  <button onClick={handleProfileUpdate} className='btn btn-dark rounded  ms-4 mt-4'>UPDATE</button>
                  </div>
                </Col>
              </Row>
                
              </div>
    </div>
    <ToastContainer theme='colored' autoClose={3000} position='top-center' />

    </>
  )
}

export default Profile