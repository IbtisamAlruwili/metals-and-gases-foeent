import React ,{useState}from "react";
import { NavLink } from "react-router-dom";
import "./Login.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // const [user, setuser] = useState({})
  const [token, settoken] = useState("")
  const navigate = useNavigate();
  const [isAdmin, setAdmin] = useState(false);

  const goLogin  = async () => {
    if (user.email == "Admin@gmail.com" ) {
  //  يجيب به الداتا هذا لازم ان لو مافيه توكين يرجع لما اعمل تسجيل دخول ياخذ التوكين هذا اللي هو الديفولت عشان 
    settoken(token)
    setAdmin(true); // علشان يظهر زر ال delete و زر ال add في صفحه ال metal
    navigate('/home')
    return; }
    const response = await axios.post('https://metalapi.herokuapp.com/login ', user);
    try {
      // انا عندي يوز ستيت  اسمها توكين فوق وابي اخزن التوكين اللي راجع من الريسبونس في ال يوزستيت اللي اسمها توكين
      getToken(response.data.token);
       setAdmin(false);
        navigate('/home') }
    catch (error) {
      console.log("error")
    }};
  const getToken=(token) =>{
    settoken(token);
  }

  return (
    <div className="parent">

      <div className="form">
        <h2> Login</h2>
        <div className="input">
          <div className="inputBox">
            {/* <label >Email</label> */}
            {/* <input type="email"
              id="input"
              // هنا عند حدوث تغير في قيمه ال input يتم استدعاء function changeEmail
              onChange={(e) => { props.changeEmail(e) }}
              placeholder="enter your email"
              required
            /> */}
          </div>
          {/* <div className="inputBox"> */}
            {/* <label>Password</label>
            <input type="password"
              // هنا عند حدوث تغير في قيمه ال input يتم استدعاء function changePassword
              
              id="input1" onChange={(e) => { props.changePassword(e) }}
              placeholder="enter your password"
            /> */}
              {/* <input type="password"
              // هنا عند حدوث تغير في قيمه ال input يتم استدعاء function changePassword
              
              id="input1" onChange={(e) => { props.gologin(e) }}
              placeholder="enter your password"
            /> */}
          {/* </div> */}
          <div className="inputBox">
            <input type="submit" defaultValue="Sign In"
              // هنا عند حدوث تغير في قيمه ال input يتم استدعاء function goLogin وهذي موجوده في ال اب واللي بترفع الداتا  
              onClick={() => props.goLogin()} />
          </div>
        </div>
        <p className="forgot">go to Sign up <NavLink to={'/signupuser'}>click here</NavLink></p>
      </div>
    </div>
  );
}
