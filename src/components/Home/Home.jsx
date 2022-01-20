import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.jpeg";
import "./Home.css";

export default function Home(props) {
  return (
    <>
      <div className="landing">
        {/* // navbar  */}
        <div className="nav-container navbar navbar-expand-md navbar-dark Navbar ">
          <div className="w-100 d-flex justify-content-between align-middle container-lg">
            <h2 className="logo">
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
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end navbar */}
        <div className="container d-flex align-items-center h-100">
          <div className="landing-intro">
            <h1>
              Welcome to Website, a site for the finest types of Gases and
              Minerals in the Kingdom of Saudi Arabia
            </h1>
          </div>
          <div className="landing-info">
            <p>
              Saudi Arabia has increased its gas production by about 50% within
              a decade, reaching nearly 117 billion cubic meters in 2019, which
              is the highest rate of acceleration in gas production compared to
              the Gulf Cooperation Council countries
            </p>
            <div className="landing-buttons">
              <a href="/products" className="explore">
                Explore
              </a>
              {/* <a href="/contact">Contact Us</a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
