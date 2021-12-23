import React, {  useState } from 'react'
import { Routes, Route, Navigate } from 'react-router';
import "./App.css";
import "./index.css";
import axios from "axios";
import Login from './Components/Login';
import Start from './Components/Start';
import AdminSignUp from './Components/AdminSignUp';
import SignupUser from './Components/SignupUser';
import Gases from './Components/Metall';
import Metal from './Components/Gases';
import { useNavigate } from "react-router-dom";
import Home from './Components/Home';

export default function App() {
  const [invalidlogin, setInvalidLogin] = useState(false);
  const [user, setuser] = useState({ email: "", password: "" })
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
   // ذا عباره عن useState وبيكون فيه ال password , email ونوعه object
    let response = await axios.post('https://metalapi.herokuapp.com/login', user);
    try {
    
      if (response.data.priviledges.length === 5) {//priviledges  هذي عباره عن array جايه من response وبيكون فيها 5 عناصر ومن خلالها نقدر نفرق بين ال يوزر والادمن
        setAdmin(true);  // ماستخدمناها نستخدمها في ال home
        navigate('/home')
      }
      else{
        setAdmin(false);// ماستخدمناها نستخدمها في ال home
        navigate('/home')
      }
      
    }
    catch (error) {
      setInvalidLogin(true);   // ماستخدمناها نستخدمها في ال home
    }
  };

  

  return (
    <div >
      <Routes >
        <Route path='/' element={<Navigate to='/gases' />} />
        <Route path='/home' element={<Home isAdmin={isAdmin} />} />
        <Route path='/gases' element={<Gases />} />
        <Route path='/metal' element={<Metal isAdmin={isAdmin}  />} />
        <Route path='/login' element={<Login goLogin={goLogin} changePassword={changePassword} changeEmail={changeEmail} invalidlogin={invalidlogin} />} />
        <Route path='/start' element={<Start />} />
        <Route path='/signupuser' element={<SignupUser />} />
        <Route path='/adminsignup' element={<AdminSignUp />} />
      </Routes>
    </div>
  )
}

