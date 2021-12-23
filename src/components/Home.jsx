import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import homeImage from "./../Components/images/istockphoto-155418648-612x612.jpg"
import "./Home.css"

export default function Home() {
    return (
        <>
            <Navbar />
            
        <div className='vh-100 w-100 bg-black maincontent'>
            <img style={{width:"100%" ,height:"100%"}} className='HomePhoto' src={homeImage} alt="not found" />
            <h1> Welcome to our metal and gases website </h1>
        </div>
        <Footer/>
     </>
    )
}
