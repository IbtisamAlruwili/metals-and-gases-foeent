import React, { useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';


export default function SignupUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [invalidSignup, setInvalidSignup] = useState(false);
  


  const changeName = (e) => {
   setName(e.target.value);  // القيمه المدخله في ال input
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  let addUser = async () => {
    try {
      const response = await axios.post("https://metalapi.herokuapp.com/userSignUp",{ // اذا جبت الداتا لازم هذي تتنفذ قبل العمبليات اللي بعدها لانها بتكون معتمده عليها 
        name: name,
        email: email,
        password: password  // اليمين  القيمه واليسار var
      });
      console.log(response)
      if (response.data) { // اذا كانت هناك data في ال response معناه اني  ال response صحيح  
        navigate("/login")// التنقل من صفحه الي صفحه
      }
    }
    catch (error) {
      setInvalidSignup(true) // اذا كانت البيانات خاطئه يحول ال useState Invalidsignup الي true وبالتالي يظهر ال الايرور 
    }
  };


  return (

    <div className="parent">

      <div className="form">
        <h2>User Sign up</h2>
        {/* السطر 51 يظهر ال جمله التي بداخلعه عندما يكون invalidsignup ب true  */}
        {invalidSignup? <p style={{color :"red"}}>Invalid email or password, try again! </p> :'' }

        <div className="input">
          <div className="inputBox">
            <label >Username</label>
            <input type="text"
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
            <input type="submit" 
              onClick={addUser}
            />
          </div>
        </div>
        <p className="forgot">go to log in now <NavLink to={'/login'}>click here</NavLink> </p>
      </div>
    </div>
  )
}




