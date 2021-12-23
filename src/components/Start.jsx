import React from 'react'
import "./Start.css";
import { NavLink } from 'react-router-dom';
export default function Start() {
    return (
        <div>
            <div className="fullPageDiv">
                <div className="ParentDiv">
                    <div> <h2>Register as :</h2></div>
                    <div> 
                        <button className="user">
                         <NavLink  className='nav-link link-dark' to='/signupuser'>User</NavLink>
                        </button>
                        <button className="admin">
                            <NavLink  className='nav-link link-dark' to='/adminsignup'>Admin</NavLink>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
