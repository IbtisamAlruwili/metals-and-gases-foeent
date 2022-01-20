import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
// import './Signup.css';

export default function SignupUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [invalidSignup, setInvalidSignup] = useState(false);

  


  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    console.log({ name, email, password });
  }, [name, email, password]);

  const addUser = async () => {
    try {
      const response = await axios.post("https://metal-gases-api.herokuapp.com/userSignUp", {
        name: name,
        email: email,
        password: password
      });
      if (response.data.Like) {
        navigate("/login")
      }
    }
    catch (error) {
      setInvalidSignup(true)
    }
  };


  return (

    <div className="parent">

      <div className="form">
        <h2>User Sign up</h2>
        {invalidSignup? <p style={{color :"red"}}>Invalid email or password, try again! </p> :'' }

        <div className="input">
          <div className="inputBox">
            <label >Username</label>
            <input type="email"
              required
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
              required
              id="input1" onChange={(e) => {
                changeEmail(e);
              }}
              placeholder="enter your email"
            />
          </div>

          <div className="inputBox">
            <label >Password</label>
            <input type="password"
              required
              onChange={(e) => {
                changePassword(e);
              }}
              placeholder="enter your password"
            />
          </div>
          <div className="inputBox">
            <input type="submit" defaultValue="Sign In"
              onClick={addUser}
            />
          </div>
        </div>
        <p className="forgot">go to log in now <NavLink to={'/login'}>click here</NavLink> </p>
      </div>
    </div>




  )
}
