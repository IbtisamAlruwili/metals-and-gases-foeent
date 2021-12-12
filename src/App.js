import React , {useState} from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Product from"./components/Product";
import { Route } from "react-router";
import"./Style.css"
export default function App() {
const [token,setToken]=useState("");
  
  return (
    <div>
     {/* <NavBar token={token} setToken={setToken}/> */}
     <Route exact path="/" render={()=>{return <Login setToken={setToken}/>}} />

      <Route exact path="/Product" render={()=>{return <Product token={token}/>}}/>
      <Route exact path="/signUp" component={SignUp} /> 

      
  
    </div>
  );
}
