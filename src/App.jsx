import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router';
import "./App.css";
import "./index.css";
import axios from "axios";
import Login from './Components/Login';
import Products from './Components/Products';
import SignupUser from './Components/SignupUser';
import Gases from './Components/Gases';
import Metal from './Components/Metal';
import { useNavigate } from "react-router-dom";
import Home from './Components/Home';
import CartItem from './Components/CartItem';
// import Cart from './Components/Cart';
import Item from './Components/Item';

export default function App() {

  const [user, setuser] = useState({ email: "", password: "" })
  const [token, settoken] = useState("")
  const navigate = useNavigate();
  const [isAdmin, setAdmin] = useState(false);

  const changeEmail = (e) => {
    let myUser = { ...user }
    myUser.email = e.target.value;
    setuser(myUser);
  };

  const changePassword = (e) => {
    let myUser = { ...user }
    myUser.password = e.target.value;
    setuser(myUser);
  };

  const goLogin = async () => {
   try {
      let response = await axios.post('https://metalapi.herokuapp.com/login ', user); //ترفع اليوزر اي البيانات الايميل والباسورد
     console.log(response)
     if (response.data.role_id == 1) {//اشيك على البيانات وارجع من الريسبونس ان الرول تساوي واحد 
        settoken(response.data.token)//اذا هو واحد يجيب التوكن للشخص 
        setAdmin(true);  //تصير ترو علشان ذي للكرود
        navigate('/home')
        
     } 
     else{
         getToken(response.data.token);//لو غلط يعني هو يوزر عادي 
         setAdmin(false);   //ترجع بفولس
         navigate('/home')
     }
    }
    catch (error) {
      console.log(error)
    }
  };

  const getToken=(token) =>{
    settoken(token);
  }

  return (
    <div >
      <Routes >
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/products' element={<Products isAdmin={isAdmin} token={token} />} />
        <Route path='/gases' element={<Gases isAdmin={isAdmin} token={token} />} />
        <Route path='/CartItem' element={<CartItem   token={token} />} />
        <Route path='/Item' element={<Item  token={token} />} />
        
        <Route path='/metal' element={<Metal isAdmin={isAdmin} token={token} />} />
        <Route path='/login' element={<Login goLogin={goLogin} changePassword={changePassword} changeEmail={changeEmail}  />} />
        <Route path='/signupuser' element={<SignupUser />} />
      </Routes>
    </div>
  )
}

