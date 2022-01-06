import React from 'react'
import "./Navbar.css"
import { NavLink } from 'react-router-dom';
import welcomeImage from "./../Components/images/kT1yJX5.jpg"

export default function Navbar() {
    return (
        <div className='nav-container py-4' >
            <span className='fst-italic'> 
            <img width="50px" height="50px" className='rounded-circle me-2' src={welcomeImage} alt="not found " />
            Metal and Gases </span>
            <ul>
                <li>
                    <NavLink className="nav-link link-light fs-6" to="/products">Exploration</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link link-light fs-6" to="/gases">Gases</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link link-light fs-6" to="/metal">Metal</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link link-light fs-6" to="/signupuser">Signin/Up</NavLink>
                </li>
                

                <li>
                    <NavLink className="nav-link link-light fs-6" to="/CartItem">
                    <i class="fas fa-cart-plus fa-2x text-danger"></i>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
