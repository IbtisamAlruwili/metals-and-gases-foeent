import React from 'react'
import "./Navbar.css"
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className='nav-container py-4' >
            <span className='fst-italic'></span>
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
            </ul>
        </div>
    )
}
