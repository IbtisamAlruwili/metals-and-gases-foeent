import React, { useState } from "react";
import axios from "axios";
import "./Singup.css"
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';

export default function AdminSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const addUser = async () => {
    try {
      const response = await axios.post("https://metalapi.herokuapp.com/adminSignUp", {
        name: name,
        email: email,
        password: password,
      });
      
      // 
      if (response.data) {// اذا كانت هناك data في ال response معناه اني كدا ال response صحيح 
        navigate('/login');
      }
    }
    catch (error) {
      console.log("error");
    }
  };

  return (

    <div>
      <div className="parent">
        <div className="form">
          <h2>Admin Sign up</h2>
          <div className="input">
            <div className="inputBox">
              <label >Username</label>
              <input type="text"
                id="input"
                onChange={(e) => {
                  changeName(e);
                }}
                placeholder="enter your name"
              />
            </div>

            <div className="inputBox">
              <label >Email</label>
              <input type="email"
                id="input1" onChange={(e) => {
                  changeEmail(e);
                }}
                placeholder="enter your email"
              />
            </div>

            <div className="inputBox">
              <label >Password</label>
              <input type="password"
                onChange={(e) => {
                  changePassword(e);
                }}
                placeholder="enter your password"
              />
            </div>
            <div className="inputBox">
              <input type="submit" defaultValue="Sign In"
                onClick={() => {
                  addUser();
                }}
              />
            </div>
          </div>
          <p className="forgot">go to log in now <NavLink to={'/login'}>click here</NavLink> </p>
        </div>
      </div>
    </div>

  )
}
