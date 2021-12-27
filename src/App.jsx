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



export default function App() {

  const [invalidlogin, setInvalidLogin] = useState(false);
  const [user, setuser] = useState({ email: "", password: "" })
  const [token, settoken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWI5OWJlMWE4ZGRlZmUzODI4MDFjZTUiLCJ1c2VyTmFtZSI6ImhoIiwiaWF0IjoxNjM5NTU3MTU0fQ.E5JB20uiJmvaRzy01dq-gyGqSAS5mGJmj31eDvCQfj4")
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
        

  let goLogin = async () => {
   if (user.email=="Admin@gmail.com" && user.password=="00000") {
    setAdmin(true); // علشان يظهر زر ال delete و زر ال add في صفحه ال metal
    navigate('/products')
    return;
   }
   







   
    let response = await axios.post('https://metalapi.herokuapp.com/login ', user);
    try {
      getToken(response.data.token);
      if (response.data.priviledges.length === 5) {
        setAdmin(true);
        navigate('/products')
      }
      else{
        setAdmin(false);
        navigate('/products')
      }
      
    }
    catch (error) {
      setInvalidLogin(true);
    }
  };

  function getToken(token) {
    settoken(token);
  }


  return (
    <div >
      <Routes >
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/products' element={<Products isAdmin={isAdmin} token={token} />} />
        <Route path='/gases' element={<Gases token={token} />} />
        <Route path='/metal' element={<Metal isAdmin={isAdmin} token={token} />} />
        <Route path='/login' element={<Login goLogin={goLogin} changePassword={changePassword} changeEmail={changeEmail} invalidlogin={invalidlogin} />} />
        <Route path='/signupuser' element={<SignupUser />} />
      </Routes>
    </div>
  )
}

