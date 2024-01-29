import { useState } from 'react'
import React from 'react'
import Navbar from './Navbar/Navbar.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from "./components/Home.jsx"
import About from "./components/About.jsx" 
import MyCart from './components/MyCart.jsx'
import MyOrders from './components/MyOrders.jsx'
import View from "./components/View.jsx"
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import { CartProvider } from './components/ContextReducer.jsx'
import Footer from "./components/Footer.jsx" 
import UserData from './components/UserData.jsx'

function App() {

  return (
    <>
    <CartProvider>
    <BrowserRouter>
    <Routes>

      <Route path="/"  element={<Home />}  />
      <Route path="/about" element={<About />}  />
      <Route path="/mycart" element={<MyCart />} />
      <Route path="/myorders" element={<MyOrders />} />
      <Route path="/viewall" element={<View />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />}  />
      <Route path="/userdata" element={<UserData />} />
    </Routes>
    <Footer />
    
    </BrowserRouter>
    </CartProvider>
    
    </>
  )
}

export default App
