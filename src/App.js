import React , {useState} from "react";
import NavBar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Product from"./components/Product";
import Favirot  from "./components/Favirote"
import Coffe from "./components/Coffe"
import { Route } from "react-router";
import"./Style.css"
export default function App() {
const [token,setToken]=useState("");
  
  return (
    <div className="nav">
     <NavBar token={token} setToken={setToken}/>
      <Route exact path="/Product" render={()=>{return <Product token={token}/>}}/>
      <Route exact path="/login" render={()=>{return <Login setToken={setToken}/>}} />
      <Route exact path="/signUp" component={SignUp} /> 
      <Route exact path="/Favirote" render={()=>{return <Favirot token={token}/>}} /> 
      <Route exact path="/Coffe/:id" render={()=>{return <Coffe token={token}/>}} /> 

    </div>
  );
}

