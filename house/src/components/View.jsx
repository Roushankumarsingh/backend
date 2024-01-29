import React from 'react'
import Card from "./Card.jsx" 
import { useDispatchCart } from './ContextReducer.jsx'
import { useCart } from './ContextReducer.jsx'
import "./View.css" 
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar.jsx'

export default function View() {

  let navigate = useNavigate() ; 

  const navToHome = ()=>
  {
    console.log("Moving twoards the home ....") ; 
    navigate("/") ; 
  }
  let data = useCart() ; 
  let dispatch = useDispatchCart() ; 
  if(data.length === 0)
  {
    return (
      <>
       <Navbar />
      <div  className='empty-content'  >
        <h2>The View List  is Empty !!!!.....</h2>
      </div>
      </>
    )
  }


  return (
    <>
    <Navbar />
      {data.map((user)=>
      (
      <div  className="user-class"  key={user.id}  >
        <div className='img' >
        <img src={user.image} />
        </div>
        <div className='text-content'  >
          <h4> {user.description} </h4>
          <h3> <span> {user.name} </span> </h3>
          <h3> Total Price <i className="fa-solid fa-arrow-right"></i> <span> &#8377; {user.price} </span>   </h3>
          <h3> Place  <i className="fa-solid fa-arrow-right"></i> <span> {user.location} </span> </h3>
          <h3> Country <i className="fa-solid fa-arrow-right"></i> <span> {user.country} </span> </h3>
          <div className='btn'  >
           <Link to="/mycart" >  <button>Add to Cart</button> </Link>
            <button  onClick={navToHome}  >Back</button>
          </div> 
        </div>
      </div>
      
      ))}
      
      </>
  )
}




{/* {data.map((user)=>
          (
            <h3>The name of the user is :- {user.name}</h3>
          ))}
        </div> */}
