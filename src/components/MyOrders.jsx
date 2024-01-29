import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import "./MyOrders.css" 
import { useNavigate } from 'react-router-dom';



export default function MyOrders() {
  const [orderData ,setOrderData] = useState("") ; 

  const navigate = useNavigate() ; 

  const backToHome = () =>
  {
    navigate("/") ; 
  }

  const fetchMyOrder = async() =>
  {
    console.log(localStorage.getItem("userEmail")) ; 
    await fetch("http://localhost:4000/api/myorderData" , {
      method : "POST" , 
      headers : {
        "Content-Type":"application/json" , 
      },
      body: JSON.stringify({
        email : localStorage.getItem("userEmail") 
      })
    }).then(async(res) =>
    {
      let response = await res.json() 
      await setOrderData(response) ; 
    })
  }

  useEffect(()=>
  {
    fetchMyOrder() ; 
  },[]) ; 




  return (
    <div>
      <Navbar />
      <div   className='order-section'   >
        <h1> Orders are ...... </h1>

        <div>

          {orderData !== "" ?  Array(orderData).map(data =>
          {
            return (
              data.orderData ? 
              data.orderData.order_data.slice(0).reverse().map((item)=>
              {
                return(
                  item.map((arrayData) =>
                  {
                    return (
                      <div key={arrayData.id}  > 
                        {arrayData.Order_date   ?

                        <div id={arrayData.id}   > 
                          {data = arrayData.Order_date} 
                          <hr/>
                           </div>
                        
                      : <div className='container-main'   > 
                      <div  className='main-1f'  >
                        <div  className='img-group '  > 
                          <img src={arrayData.image}  />

                          <div  className='text-group'  > 
                            <span> {arrayData.name}  </span>
                            <span> {arrayData.price}  </span>
                            <span>   {arrayData.location} </span>
                            <span>   {arrayData.country} </span>
                             
                              </div>
                          </div>
                          </div>
                         </div>
                      }
                         </div>
                    )
                  })
                )
              })


              :" "
            )
          })


          
          :" "
        }
          <div>
          </div>
        </div>


      </div  >
      <button onClick={backToHome}  > Back</button>
    </div>
  )
}

