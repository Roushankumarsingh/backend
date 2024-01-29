import React from 'react'
import "./Signup.css"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'


export default function Signup() {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", pin: "", city: "", location: "", phone: "" });
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(credentials) ; 
    try {
      const response = await fetch("http://localhost:4000/api/registerusers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          pin: credentials.pin,
          phone: credentials.phone,
          location: credentials.location,
          city: credentials.city,
        }),
      });

      const json = await response.json();
      console.log(json);
      if (json.success) {

        localStorage.setItem("userName", credentials.name);
        localStorage.setItem("userPhone", credentials.phone);
        localStorage.setItem("userPin", credentials.pin);
        localStorage.setItem("userCity", credentials.city);
        localStorage.setItem("userCountry", credentials.location);
        console.log(credentials.name);
        console.log(credentials.phone);
        console.log(credentials.pin);
        console.log(credentials.city);
        console.log(credentials.location);


        alert("Well done ! you have registered..Go to login page with the same email and password");
        navigate("/");
        // console.log(credentials.name) ; 
        // console.log(credentials.email) ; 
      }
      else {
        alert("Enter valid credentials....");
      }





    } catch (err) {
      console.log(`There is an error in this event handleSubmit ${err}`);
    }
  }

  const onchange = (event) => {
    event.preventDefault();
    // console.log(event.target.value) ; 
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const back = () => {
    navigate("/");
  }


  return (
    <>
      <Navbar />
      <div className='signup'  >
        <div className="signup-page">
          <h2>Sign up for more benefits!!</h2>
          <input placeholder='Enter  Email' name="email" type="text" onChange={onchange} />
          <input placeholder='Full Name' type="text" name="name" onChange={onchange} />
          <input placeholder='Password' type="text" name="password" onChange={onchange} />
          <input placeholder='Enter Phone Number ' type="text" name="phone" onChange={onchange} />
          <input placeholder='Enter your city ' type="text" name="city" onChange={onchange} />
          <input placeholder='Enter Pin Number' type="text" name="pin" onChange={onchange} />
          <input placeholder='Enter your Country' type="text" name="location" onChange={onchange} />
          <p>By signing up, you agree to our <span>Terms </span>, </p>
          <p><span>Privacy Policy</span> and <span>Cookies Policy</span> .</p>
          <button onClick={handleSubmit}  >Sign up</button>
        </div>
        <div className="signup-to-login">
          <p>I am already a user </p>
          <button><Link to="/login" style={{ color: "white", textDecoration: "none" }} >Login</Link> </button>
        </div>
        <button className='back-btn' onClick={back} >Back</button>
      </div>
    </>
  )
}
