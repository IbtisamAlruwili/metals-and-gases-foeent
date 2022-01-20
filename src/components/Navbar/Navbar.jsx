import React from "react";
import "./Navbar.css";
import logo from "../images/logo.jpeg";
import { NavLink } from "react-router-dom"; //بس يغير ال url

export default function Navbar(props) {
  return (
    <div className="nav-container navbar navbar-expand-md navbar-dark Navbar ">
      <div className="w-100 d-flex justify-content-between align-middle container-lg">
        <h2 className="logo fs-sm-2">
          <img src={logo} />
          <div>
            <span className="sc-color">Metal </span> & <br />
            <span className="main-color">Gases</span>
          </div>
        </h2>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse  navbar-collapse d-md-flex justify-content-between"
          id="collapsibleNavId"
        >
          <div className="nav-navbar">
            <ul className="d-sm-flex flex-sm-column flex-md-row">
              <li>
                <NavLink className="nav-link" to="/Home">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/products">
                  Exploration
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/gases">
                  Gases
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/metal">
                  Metal
                </NavLink>
              </li>
            </ul>
            <div>
              {props.logOut ? (
                <NavLink
                  onClick={() => {
                    window.location.reload(true);
                    localStorage.setItem("user", "");
                  }}
                  className="logoutBtn"
                  to="/signupuser"
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink className="signBtn" to="/signupuser">
                  Signin/Up
                </NavLink>
              )}
              <NavLink className="cart fs-2 ms-3" to="/Cart">
                <i class="fas fa-cart-plus  main-color"></i>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
