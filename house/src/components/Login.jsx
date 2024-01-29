import React from 'react'
import Navbar from '../Navbar/Navbar'
import "./Login.css" 
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const [credentials , setCredentials] = useState({email:"" , password:""}) ; 

  let navigate = useNavigate() ; 


  const handleSubmit = async(event)=>
  {
    event.preventDefault() ; 
    // console.log(credentials) ; 

    try{
      const response = await fetch("http://localhost:4000/api/loginusers",{
        method:"POST" , 
        headers:{
          "Content-Type":"application/json" , 
        },
        body: JSON.stringify({
          email:credentials.email , 
          password:credentials.password ,
        }),
      }) ; 

      const json = await response.json() ; 
      console.log(json) ; 
      if(json.success)
      {
        // localStorage.setItem("userName" , credentials.name) ; 
        localStorage.setItem("userEmail", credentials.email) ; 
        localStorage.setItem("authToken",json.authToken) ; 
        console.log(localStorage.getItem("authToken")) ; 

        // console.log(credentials.email) ; 
        console.log(credentials.email) ; 
        // console.log(credentials.name) ; 
        navigate("/") ; 


        // const userDataResponse = await fetch("http://localhost:4000/api/userData", {
        //   method: "GET",
        //   headers: {
        //     Authorization: `Bearer ${json.authToken}`, // Pass the auth token for authorization
        //   },
        // });

        // const userData = await userDataResponse.json();
        // console.log("User Data:", userData);





       
      }
      else 
      {
        alert("Enter valid Credentials") ; 
      }


    }catch(err)
    {
      console.log(`There is something error in this code ${err}`) ; 
    }


  }




  const onchange = (event)=>
  {
    event.preventDefault() ; 
    setCredentials({...credentials , [event.target.name ] : event.target.value}) ; 
  }

  const back = ()=>
  {
    navigate("/") ; 
  }




  return (
    <div className='login' >
      <Navbar />
      <div className="login-feature">
      <h2>Login for the best experience  </h2>
      <input placeholder='email or username'  type="email" name="email" value={credentials.email}  onChange={onchange} />
      <input placeholder='password' type="password" name="password" value={credentials.password} onChange={onchange}  />
      <button onClick={handleSubmit}  >Login</button>
      <p><span>I'm a new user</span>  <button><Link to="/signup" style={{color:"white" , textDecoration:"none"}}   >Sign up</Link> </button>   </p>
      </div>
      <button className='back-btn'  onClick={back}  >Back</button>
    </div>
  )
}
