import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router';
import "./App.css";
import "./index.css";
import Login from './Components/Login';
import Products from './Components/Products';
import SignupUser from './Components/SignupUser';
import Gases from './Components/Gases';
import Metal from './Components/Metal';
import Home from './Components/Home';



export default function App(token) {

  // const [user, setuser] = useState({ email: "", password: "" })
  const [token, settoken] = useState("")
  // const navigate = useNavigate();
  const [isAdmin, setAdmin] = useState(false);

  // const changeEmail = (e) => {
  //   let myUser = { ...user }
  //   myUser.email = e.target.value;
  //   setuser(myUser);
  // };

  // const changePassword = (e) => {
  //   let myUser = { ...user }
  //   myUser.password = e.target.value;
  //   setuser(myUser);
  // };

  const goLogin = async () => {
    //
    if (user.email == "Admin@gmail.com" ) {
  //  يجيب به الداتا هذا لازم ان لو مافيه توكين يرجع لما اعمل تسجيل دخول ياخذ التوكين هذا اللي هو الديفولت عشان 
    settoken(token)
    setAdmin(true); // علشان يظهر زر ال delete و زر ال add في صفحه ال metal
    navigate('/home')
    return;
   }
   
    let response = await axios.post('https://metalapi.herokuapp.com/login ', user);
    try {
      // انا عندي يوز ستيت  اسمها توكين فوق وابي اخزن التوكين اللي راجع من الريسبونس في ال يوزستيت اللي اسمها توكين
      getToken(response.data.token);

        setAdmin(false);
        navigate('/home')
      
    }
    catch (error) {
      console.log("error")
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
        <Route path='/gases' element={<Gases token={token} />} />
        <Route path='/metal' element={<Metal isAdmin={isAdmin,setAdmin} token={token,settoken} />} />
        <Route path='/login' element={<Login isAdmin={isAdmin} />} />
        <Route path='/signupuser' element={<SignupUser />} />
      </Routes>
    </div>
  )
}

