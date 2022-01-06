import React from 'react'
import { NavLink } from 'react-router-dom'
import welcomeImage from "./../Components/images/kT1yJX5.jpg"
import "./Home.css"

export default function Home() {
    return (
        <>
    


           <div className="welcomeBackground">
        {/* // navbar  */}
           <div className='nav-container  py-4' >
                <div  className='shadow-lg p-1 border border-2 rounded-circle border-danger mt-2'>
                    <img width="50px" height="50px" src={welcomeImage} alt="" />
                </div>
            <ul>
                <li>
                    <NavLink className="nav-link link-light fs-4" to="/products">Exploration</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link link-light fs-4" to="/gases">Gases</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link link-light fs-4" to="/metal">Metal</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link link-light fs-4" to="/signupuser">Signin/Up</NavLink>
                </li>
            </ul>
        </div>
        {/* end navbar */}
                <div className="welcomeTitle text-light col-md-5">
                    <h1>Welcome to our website</h1>
                    <p className='ms-5'>Saudi Arabia has increased its gas production by about 50% within a decade, reaching nearly 117 billion cubic meters in 2019, which is the highest rate of acceleration in gas production compared to the Gulf Cooperation Council countries</p>
                    <h1> About website</h1>
                    <p className='ms-5'>This site displays the finest types of gases and minerals in the Kingdom of Saudi Arabia</p>
                </div>
                <div className="welcomeButtons text-light flex-wrap ">
                <NavLink className="" to="/gases"><button className='btn bg-info fs-2 fw-bold border-0  my-4'>Start Now </button></NavLink>
                    <button className='btn bg-danger fs-2 fw-bold border-0 w-75'>Contact Us </button>
                </div>
            </div> 
        </>
    )
}
