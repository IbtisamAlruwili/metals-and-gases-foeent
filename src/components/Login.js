import React, { useState } from "react";
import {Link,  useHistory } from "react-router-dom";
import axios from "axios";
import "./Login.css"
export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // you can use variable instded of state in this  case
  const history = useHistory();
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const checkLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email:email, password:password
      });
      setToken(response.data.token);
      history.push("/Product");
    } catch (error) {
      console.log(error);
    }
  };
  return ( 
    <div id="maindev">
       <Link className="link" to="/signUp">
              signUp
            </Link>
    <div className="signup">
      <input id="input"
        onChange={(e) => {
          changeEmail(e);
        }}
        placeholder="enter your email"
      />
      <input id="input1"
        onChange={(e) => {
          changePassword(e);
        }}
        type="password"
        placeholder="enter your password"
      />
      <button id= "btn"
        onClick={() => {
          checkLogin();
        }}
      >
        Login
      </button>
    </div>
    </div>
  );
}
