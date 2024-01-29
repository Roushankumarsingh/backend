import React, { useEffect } from 'react'
import Card from "./Card.jsx"
import  { useState } from "react" 
import "./Home.css"
import View from './View.jsx'
import Navbar from '../Navbar/Navbar.jsx'
import { useCart } from './ContextReducer.jsx'
import { useNavigate } from 'react-router-dom'
import wanderlust from "./wanderlust.webp"
import { Link } from 'react-router-dom'

export default function Home() {

  const [userData , setUserData] = useState([]);

  const loadData = async()=>
  {
    let response = await fetch("http://localhost:4000/api/userdata",{
      method: "POST" , 
      headers : {
        "Content-Type" : "application/json" ,
      }
    });

    response = await response.json() ; 
    console.log(response) ; 

    setUserData(response[0]) ; 
    // console.log(response[0]) ; 
  }
  useEffect(()=>
  {
    loadData() 
  },[]) ; 
  const [tag, setTag] = useState("Home");
  let data = useCart();

  const [selectedcountry, setSelectedCountry] = useState("");

  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const handlelogout = () => {
      localStorage.removeItem("authToken");
      navigate("/login");
  }


  const valueChange = (event) => {
      // console.log(event.target.value) ; 
      setSearch(event.target.value);
  }

  const valueTaken = () => {
      console.log(search);
      setSelectedCountry(search);
      navigate("/country");
  }

  const takeToUser = () => {
      navigate("/userdata");
  }
  const todaysDeal = ()=>
  {
      navigate("/") ; 
  }
  const toMyOrders = ()=>
  {
      navigate("/myorders") ; 
  }

  const handleSelectChange = (event)=>
  {
      event.preventDefault() ; 
      const selectedOption = event.target.value  ; 
      if(selectedOption == "logout")
      {
          handlelogout() ; 
      }else if(selectedOption == "user")
      {
          takeToUser()  ; 
      }else if(selectedOption == "todays")
      {
        todaysDeal() ; 
      }else if(selectedOption == "myorders")
      {
        toMyOrders() ; 
      }else if(selectedOption == "home")
      {
        navigate("/") ; 
      }else if(selectedOption == "about")
      {
        navigate("/about") ; 
      }
    }

    const handleSearch = () => {
      const filteredData = userData.filter((data) => {
        const nameMatch = data.country.toLowerCase().includes(search.toLowerCase());
        const countryMatch = selectedcountry
          ? data.country.toLowerCase() === selectedcountry.toLowerCase()
          : true;
        return nameMatch && countryMatch;
      });
      console.log(filteredData);
      setUserData(filteredData);
    };

 

  return (
    <>
            <div className='parent'  >
            <div className="nav-img">
                <img src={wanderlust} />
            </div>
            <div className="home">
                <h3 onClick={() => { setTag("Home") }}  > <Link to="/" style={{ textDecoration: "none", color: "white" }}   > <i className="fa-solid fa-house"></i> </Link>  {tag == "Home" ? <hr /> : <></>} </h3>
            </div>
            <div className='search-bar' >
                <input placeholder="search" name="name" value={search} onChange={valueChange} />
                <i onClick={handleSearch} className="fa-solid fa-magnifying-glass"></i>
            </div>
            {!localStorage.getItem("authToken") ?
                <div className='login-before' >

                    <div className="home">
                        <Link to="/login" ><button      >login  </button></Link>
                    </div>
                    <div className="home">
                        <Link to="/signup"  ><button >Signup    </button></Link>
                    </div>
                </div> : <div>

                    <div className='login-after' >
                        <div className="home">
                            <h3 onClick={() => setTag("My Cart")}   > <Link to="/mycart" style={{ textDecoration: "none", color: "white" }}   > 
                            <div className="cart-badge">{data.length} </div><i className="fa-solid fa-cart-shopping">  </i>
                           </Link> {tag == "My Cart" ? <hr /> : <></>}  </h3>
                        </div>
                        <select onChange={handleSelectChange} >
                            <option value="settings"   >Profile </option>
                            <option value="about"  >About</option>
                            <option value="home"  >Home</option>
                            <option  value="logout"       >Log out
                            </option>
                            <option value="myorders"  > My Orders</option>
                          
                            
                            <option value="todays"  > Today's Deal </option>
                            <option   value="user"     >
                                User
                            </option>
                           
                        </select>
                    </div>
                </div>
            }

        </div>
    <div  className='content'  >
      {
        userData && userData.length > 0 ?  userData.map((data)=>
        {
          return (
            <div key={data._id} > 

            <Card  roomData = {data}
             />
             </div>
          )
        }) : <> <h1> No Such data Found please chose another place for the journey </h1> </>
      }
      
    </div>
    </>
  )
}
