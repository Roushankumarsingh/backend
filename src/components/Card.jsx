import React from 'react'
import "./Card.css" 
import { Link } from 'react-router-dom'
import View from './View'
import { useDispatchCart } from './ContextReducer'
import { useCart } from './ContextReducer'
import Navbar from '../Navbar/Navbar'

export default function Card(props) {
  let dispatch = useDispatchCart() ; 
  let data = useCart() ; 
    const onViewData = async()=>
    {
      console.log("how are you ") ; 
      await dispatch({type:"ADD" , id:props.roomData._id , name : props.roomData.name , location: props.roomData.location  , country : props.roomData.country , description:props.roomData.description , price : props.roomData.price , image : props.roomData.image}) ; 
      // console.log(data) ; 
    }
  return (
    <>
    <div className='container'  >
        <div className="img-section">
            <img src={props.roomData.image} />
        </div>
        <div className="detail-section">
            <h3> <span>  {props.roomData.name}</span> </h3>
            <h3>Total Price <i className="fa-solid fa-arrow-right"></i> <span>	&#8377;{props.roomData.price}</span> </h3>
            <h3>place <i className="fa-solid fa-arrow-right"></i> <span>{props.roomData.location}</span> </h3> 
            <h3> Country  <i className="fa-solid fa-arrow-right"></i>  <span>{props.roomData.country}</span> </h3>
            {localStorage.getItem("authToken") ? 
            <button onClick={onViewData}  ><Link  to="/viewall"  style={{textDecoration : "none" , color:"white"}} >View </Link> </button> :
            <button  > <Link to="/login" style={{color:"white" , textDecoration : "none"}} > Sign in </Link>  </button>
            }
            
        </div>
    </div>
    </>
  )
}
