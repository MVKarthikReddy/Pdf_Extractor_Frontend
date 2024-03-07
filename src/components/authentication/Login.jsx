import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import '../../styles/login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Tooltip } from 'react-tooltip'

export const Login = () => {

    const navigate = useNavigate()

    const [details,setDetails] = useState({
        email : "",
        password : "",
        
    })

    const handleChange = (e) => {
        setDetails({...details,[e.target.name]:e.target.value})
    }


    const signInUser = async (e) => {
        e.preventDefault();
        console.log('Hello')
        if(details.email == "" && details.password=="")
        {
            alert("Enter all the details")
        }
        else{

            await axios.post(
                'https://pdf-extractor-backend.onrender.com/api/users/login/',
                 details
            ).then((res) => {
    
                if(res.data.msg)
                {
                    alert(res.data.msg)
                    navigate('/register')
                }
                else{
    
                    localStorage.setItem('token', (res.data.accessToken))
                    navigate('/home')
    
                }
                
            })

        }
        
    }

  return (
    
    
    <div className='register-container'>
          <div className="login-con">
                <div className='wrapper'>
                    <h2>Login Now</h2>
                    <p>save your time!</p>
                    <form onSubmit={signInUser}>
                        <input type='email' name='email' value={details.email} onChange={(e) => {handleChange(e)}} placeholder='enter email'/><br/>
                        <input type='password' name='password' value={details.password} onChange={(e) => {handleChange(e)}} placeholder='enter password'/><br/>
                        <p className="recover">
                            <a href="/">Recover Password</a>
                        </p>
                        <button type='submit' >Sign In</button>
                        
                    </form>
                    
                    <p className="or">
                        ----- or login with -----
                    </p>
                    <div className='icon'>
                       
                            <div className="icons"
                                 data-tooltip-id="my-tooltip" data-tooltip-content="Hello world!"
                            >
                    
                                <FcGoogle/>
                                <Tooltip id="my-tooltip" />

                 
                            </div>
                    </div>
                    <div className="not-member">
                        Not a member? <span onClick={() => {navigate('/register')}}>Register Now</span>
                    </div>
                </div>
                        
            </div>
    </div>
    
  )
}