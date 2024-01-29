import React from 'react'
import Navbar from '../Navbar/Navbar'
import "./UserData.css"
import Email from "./Email.jpg"
import Phone from "./phone.png"
import User from "./user.jpg"
import Location from "./location.webp"
import country from "./country.png"
import { useNavigate } from 'react-router-dom'

export default function UserData(props) {

  let navigate = useNavigate() ; 


  const userEmail = localStorage.getItem("userEmail");
  let userName = localStorage.getItem("userName");
  // console.log(userName) ; 
  let userCountry = localStorage.getItem("userCountry")
  let userCity = localStorage.getItem("userCity");
  let userPin = localStorage.getItem("userPin");
  let userNumber = localStorage.getItem("userPhone");

  const bckHome = ()=>
  {
    navigate("/") ; 
  }

  return (
    <div>
      <Navbar />
      {localStorage.getItem("authToken") ?
        <div className='user-section'  >
          <div className='user-img'  >
            <img src={User} />
            <h3> {userName} </h3>
          </div>
          <div className='user-email'  >
            <img src={Email} />
            <h3> {userEmail}  </h3>
          </div>
          <div className='user-phone'  >
            <img src={Phone} />
            <h3> {userNumber} </h3>
          </div>
          <div className='user-location' >
            <img src={Location} />
            <h3> {userCity} </h3>
          </div>
       <div className='user-pin' > 
        <h2>PIN</h2> 
        <h3> {userPin} </h3>
       </div>
       <div className='user-location'  > 
        <img src={country} />
        <h3> {userCountry} </h3>
         </div>
         <button onClick={bckHome}  > Back</button>
        </div> : <></>}
    </div>
  )
}
