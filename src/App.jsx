import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router";  //  او الكومبوننت بناء على url , Route يظهر اللي بالصفحه 
import "./App.css";
import "./index.css";
import axios from "axios";  //يعمل ريكويست او يبعثه للباكيند 
import Login from "./Components/Login/Login";
import Products from "./Components/Products/Products";
import SignupUser from "./Components/Signup/SignupUser";
import Gases from "./Components/Gases/Gases";
import Metal from "./Components/Metal/Metal";
import { useNavigate } from "react-router-dom";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Item from "./Components/Item";
require("dotenv").config();



export default function App() {
  console.log()
  const [user, setuser] = useState({ email: "", password: "" });
  const [token, settoken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [isAdmin, setAdmin] = useState(false);  // اليسار هو ستيت وواليمين يغير القيمه
  const [logOut, setlogOut] = useState(false);

  let userInfo = localStorage.getItem("user");
  useEffect(async () => {
    if (userInfo) {
      setlogOut(true);
      if (userInfo == "admin") {
        setAdmin(true);
        settoken(localStorage.getItem("token"));
      } else {
        setAdmin(false);
        settoken(localStorage.getItem("token"));
      }
    } else {
      localStorage.setItem("token", "");
    }
  }, [userInfo]);

  const changeEmail = (e) => {
    let myUser = { ...user };
    myUser.email = e.target.value;
    setuser(myUser);
  };

  const changePassword = (e) => {
    let myUser = { ...user };
    myUser.password = e.target.value;
    setuser(myUser);
  };

  const goLogin = async () => {
    try {
      let response = await axios.post(
        "https://metal-gases-api.herokuapp.com/login",
        user
      ); //ترفع اليوزر اي البيانات الايميل والباسورد
      console.log(response.data);
      if (response.data.roleId == 1) {
        //اشيك على البيانات وارجع من الريسبونس ان الرول تساوي واحد
        localStorage.token = response.data.token;
        settoken(response.data.token); //اذا هو واحد يجيب التوكن للشخص
        navigate("/home");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", "admin");
      } else {
        getToken(response.data.token); //لو غلط يعني هو يوزر عادي
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", "user");
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = (token) => {
    settoken(token);
  };

  useEffect(() => {
    settoken(localStorage.token);
  }, [token]);


  // jsx يظهر على براوزر تحت ريتيرن
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home logOut={logOut} />} />
        <Route
          path="/products"   //     اذا شفت الراوت هذا يطلع لي  كومبوننت الغازات
          element={<Products isAdmin={isAdmin} token={token} logOut={logOut} />}
        />
        <Route 
          path="/gases"    //     اذا شفت الراوت هذا يطلع لي  كومبوننت الغازات
          element={<Gases isAdmin={isAdmin} token={token} logOut={logOut} />}
        />
        {/* //     اذا شفت الراوت هذا يطلع لي  كومبوننت الكارت */}
        <Route path="/Cart" element={<Cart token={token} logOut={logOut} />} />  
        {/* //     اذا شفت الراوت هذا يطلع لي  كومبوننت لوق اوت */}
        <Route path="/Item" element={<Item token={token} logOut={logOut} />} />

        <Route
          path="/metal"  //     اذا شفت الراوت هذا يطلع لي  كومبوننت المعادن
          element={<Metal isAdmin={isAdmin} token={token} logOut={logOut} />}
        />
        <Route
          path="/login"   //     اذا شفت الراوت هذا يطلع لي  كومبوننت لوقين
          element={
            <Login
              goLogin={goLogin}
              changePassword={changePassword}
              changeEmail={changeEmail}
            />
          }
        />
         {/* //     اذا شفت الراوت هذا يطلع لي  كومبوننت الدخول */}
        <Route path="/signupuser" element={<SignupUser />} />
      </Routes>
    </div>
  );
}
