import React, { useContext, useState, } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
import Header from './Header'
 import login from '../Assests/login.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../service/allAPI';
import { isAuthTokenContext } from '../Context/ContextShare';
import { Form } from 'react-bootstrap';

function Auth({register}) {
    const {isAuthenticated, setIsAuthenticated}= useContext(isAuthTokenContext)
       const [userData, setUserData] = useState({
        username:"",
        email:"",
        password:""
})

//for navigation
const navigate = useNavigate()

// function to register
const handleRegister = async(e)=>{
    e.preventDefault()
    const {username,email,password}= userData
    if(!username || !email || !password){
        toast.info("Please Fill The Form Completely")
    }
    else
    {
      const result= await registerAPI(userData)
      /* console.log(result); */
      if(result.status===200)
      {
        toast.success(`${result.data.username} Registerd Succesfully`)
        setUserData({username:"",email:"",password:""})
        navigate('/login')
      }
      else
      {
        toast.error(`${result.response.data}`)
      }
    }
}

// function to login
const handleLogin = async(e)=>{
    e.preventDefault()

    const {email,password}= userData
    if(!email || !password){
        toast.info(`please fill the form completely`)
    }
    else
    {
        const result = await loginAPI(userData)
        console.log(result); 

        if(result.status===200){
            //store data
            // in session storage key:string, value:string
            sessionStorage.setItem("existsUser",JSON.stringify(result.data.existsUser))
            sessionStorage.setItem("token",result.data.token)
            if(result.data.existsUser.email=="admin@gmail.com"){
                navigate("/admin");
            }
            else{
                setUserData({
                    username: "",
                    email: "",
                    password:""
                })
                setTimeout(()=>{
                    navigate('/')
                },2500)
            }
            toast.success('login successfull!')
            setIsAuthenticated(true)


           
            
        }
        else
        {
            toast.warning(result.response.data)
        }
    }
    
}
    
    const RegisterForm = register?true:false
  return (
    <>
      <Header/>
      <div style={{backgroundColor:'black'}} className=" mt-5 w-75 container rounded p-5 mb-5">
        <div className="row align-items-center">
            <div className="col-lg-6">
                <img src={login} style={{width:'100%'}} alt="" />
            </div>
            <div className="col-lg-6">
                <div className="d-flex align-items-center justify-content-center flex-column">
                 <h1 className='ms-3 text-white' href="/"><i style={{color:'white'}} class="fa-solid fa-circle-exclamation fs-2 me-2"></i>TRANSIT ALERTS HUB</h1>
                    <h5 className="text-light ms-5 mt-4 mb-4">
                        {
                            RegisterForm? "Sign up to your Account":"Sign in to your Account"
                        }
                    </h5>
                    <Form>

                        {RegisterForm&& <Form.Group style={{width:'100%'}} className=" ms-4 mb-3" controlId="exampleForm.ControlInput1">
                         <Form.Control style={{width:'100%'}} value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})}  type="email" placeholder="Enter Your Username" />
                        </Form.Group>}

                        <Form.Group style={{width:'100%'}} className=" ms-4 mb-3" controlId="exampleForm.ControlInput1">
                         <Form.Control value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})}  type="email" placeholder="Enter Your Email ID" />
                        </Form.Group>

                        <Form.Group style={{width:'100%'}} className=" ms-4 mb-3" controlId="exampleForm.ControlInput1">
                         <Form.Control value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})} type="password" placeholder="Enter Your Password" />
                        </Form.Group>
                       <div className='d-flex justify-content-between ms-5'>
                          {RegisterForm?
                          <div>
                              <button onClick={handleRegister} className='btn btn-dark mt-4'>REGISTER</button>
                              <p className='text-light mt-4'>Already User? Click Here to <Link style={{textDecoration:'none', color:'white'}} to={'/login'}>Login</Link></p>
                          </div>
                              :
                              <div>
                              <button onClick={handleLogin} className='btn btn-dark mt-4'>LOGIN</button>
                              <p className='text-light mt-4'>New User? Click Here to <Link style={{textDecoration:'none', color:'white'}} to={'/register'}>Register</Link></p>
                          </div>
                          }
                          <Link to={'/'}> <button  className='btn btn-dark mt-4'><i class="fa-solid fa-arrow-left 2s-3"></i> Back to Home</button></Link>  
                       </div>
                        
                     </Form>
                </div>
            </div>
        </div>
    </div>
    <ToastContainer theme='colored' autoClose={3000} position='top-center' />

    </>
  )
}

export default Auth