import React from 'react'
import wanderlust from "./wanderlust.webp" 
import "./Footer.css" 
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Footer() {

    let navigate = useNavigate() ; 
    const backtoHome = () =>
    {
        window.location.reload() ; 
    }
    const signInBlock = () =>
    {
        navigate("/login") ; 
    }

  return (
    <div className='main-content'>
        {!localStorage.getItem("authToken") ? 
        <div className='sign-in-footer'  > 
            <button onClick={signInBlock}  >Sign in </button> </div> : <></>}
        <div className='bck-to-top'  > 
            <h3 onClick={backtoHome}  >Back to Top</h3>
        </div>
        <div className='img-wanderlust' >
            <img src={wanderlust}  onClick={backtoHome}  />
            <h3 onClick={backtoHome}  >Wanderlust </h3>
        </div>
        <div className='footer-zone' >
            <h3>Conditions of Use Privacy Notice Your Ads Privacy Choices <i className="fa-solid fa-check"></i> </h3>
            <h3>© 1996-2024, Wanderlust.com,Inc. or its addiliates</h3>
        </div>

    </div>
  )
}
