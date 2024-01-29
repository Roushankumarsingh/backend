import React from 'react' 
import { useCart } from './ContextReducer'
import { useDispatchCart } from './ContextReducer'
import Navbar from '../Navbar/Navbar';
import "./MyCart.css"
import { useNavigate } from 'react-router-dom';


export default function MyCart() {

  let navigate = useNavigate() ; 

  let data = useCart() ; 
  let dispatch = useDispatchCart() ; 
  if(data.length == 0)
  {
    return (
      <>
      <Navbar />
      <h1 style={{textAlign : "center" , color:"red" , marginTop:"30px" , marginBottom : "150px"}} >There is nothing in the Cart...</h1>
      </>
    )
  }

  const onBack = ()=>
  {
    navigate("/") ; 
  }


  const handleCheckOut = async() => 
  {
    let userEmail = localStorage.getItem("userEmail") ; 
    console.log(userEmail) ; 
    // console.log(userEmail) ; 
    let response = await fetch("http://localhost:4000/api/orderData" , 
    {
      method : "POST" , 
      headers : 
      {
        "Content-Type" : "application/json" 
      },
      body : JSON.stringify({
        order_data :data , 
        email:userEmail ,  
        order_date : new Date().toDateString() ,
      })
    }) ; 

    console.log("Order Response :- ",response) ; 



    if(response.status === 200)
    {
      dispatch({type : "DROP"})
    }else 
    {
      console.error("Error in response"  , response.statusText);
    }
  }




  let totalPrice = data.reduce((total,user) => total+user.price , 0) ; 

  return (
    <div>
      <Navbar />
      {data.map((user , index) =>
      (
        <div className='content-box' key={user.id} >
          <div>
            <img src={user.image} />
          </div>
          <div   className='box-text'     > 
            <h3> {user.name} </h3>
            <h3>Total price <i className="fa-solid fa-arrow-right"></i> <span>&#8377; {user.price} </span> </h3>
            <h3> Place  <i className="fa-solid fa-arrow-right"></i> <span>{user.location} </span>  </h3>
            <h3> Country <i className="fa-solid fa-arrow-right"></i> <span>{user.country}</span> </h3>
            <div className='back-and-remove'  >
            <button  onClick={onBack}  >Back</button>
            <button  onClick={()=> {dispatch({type: "REMOVE" , index:index})}}  > <i className="fa-solid fa-trash"></i> </button>
          
            </div>
            </div>
        </div>
      ))} 

      <div  className="total"    >
        <h2> Total amount  <i className="fa-solid fa-arrow-right"></i> {totalPrice}  </h2>
       
      </div>
      <button onClick={handleCheckOut} >Check out</button>
    </div>
  )
}
