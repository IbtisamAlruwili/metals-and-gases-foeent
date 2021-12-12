import React, { useState } from "react";
import {useHistory} from "react-router-dom"
import axios from "axios";
import"./Singup.css"
export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // you can use variable instded of state in this  case
  const history = useHistory();
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
      // console.log({
      //   name: name,
      //   email: email,
      //   password: password,
      // });
    try {
      const response = await axios.post("http://localhost:5000/signUp", {
      name: name,
      email: email,
      password: password,
    });
    console.log(response);
    if (response.status === 201){
        history.push("/")
    }
    } catch (error) {
      console.log("err");
    }
  };
  return (
    <div id="maindeev">
    <div className="signup">
      <input id= "inputup"
        onChange={(e) => {
          changeName(e);
        }}
        placeholder="enter your name"
      />
      <input id="input11"
        onChange={(e) => {
          changeEmail(e);
        }}
        placeholder="enter your email"
      />
      <input id="input12"
        onChange={(e) => {
          changePassword(e);
        }}
        type="password"
        placeholder="enter your password"
      />
      <button id="btn2"
        onClick={() => {
          addUser();
        }}
      >
        sign up
      </button>
    </div>
    </div>
  );
}
