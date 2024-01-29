import React from 'react'
import "./Navbar.css"
// import houseImg from "./housing.jpg"
import houseImg from "./housing.jpg"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import App from '../App'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../components/ContextReducer'
import { useDispatchCart } from '../components/ContextReducer'
import wanderlust from "./wanderlust.webp"

export default function Navbar() {
    const [tag, setTag] = useState("Home");
    let data = useCart();

    const [country, setCountry] = useState("");

    const [value, setValue] = useState("");

    const navigate = useNavigate();
    const handlelogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }


    const valueChange = (event) => {
        // console.log(event.target.value) ; 
        setValue(event.target.value);
    }

    const valueTaken = () => {
        console.log(value);
        setCountry(value);
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

    const handleSelectChange = (event) => {
        event.preventDefault();
        const selectedOption = event.target.value;
        if (selectedOption == "logout") {
            handlelogout();
        } else if (selectedOption == "user") {
            takeToUser();
        }
        else if(selectedOption == "todays")
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


    return (
        <div className='parent'  >
            <div className="nav-img">
                <img src={wanderlust} />
            </div>
            <div className="home">
                <h3 onClick={() => { setTag("Home") }}  > <Link to="/" style={{ textDecoration: "none", color: "white" }}   > <i className="fa-solid fa-house"></i> </Link>  {tag == "Home" ? <hr /> : <></>} </h3>
            </div>
            <div className='search-bar' >
                <input placeholder="search" name="name" value={value} onChange={valueChange} />
                <i onClick={valueTaken} className="fa-solid fa-magnifying-glass"></i>
           
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
                            <div className='cart-tick'  > {data.length} </div>
                            <h3 onClick={() => setTag("My Cart")}   > <Link to="/mycart" style={{ textDecoration: "none", color: "white" }}   > <i className="fa-solid fa-cart-shopping"></i>  </Link> {tag == "My Cart" ? <hr /> : <></>}  </h3>
                        </div>
                        <select onChange={handleSelectChange} >
                            <option value="settings"   >Profile </option>
                            <option  value="about"   > About </option>
                            <option value="home"  >Home</option>
                            <option value="logout"       >Log out
                            </option>
                            <option value="myorders" >  My Orders </option>
                            <option value="todays"  > Today's Deal </option>
                            
                            <option value="user"     >
                                User
                            </option>
                            
                        </select>
                    </div>
                </div>
            }

        </div>
    )
}


{/* <div>
 <div className="home">
<Link to="/login" ><button      >login  </button></Link> 
</div>
<div className="home">
 <Link to="/signup"  ><button >Signup    </button></Link>
</div> 
</div> */}