import React from "react";
import { NavLink } from "react-router-dom";
import "./Login.css";

export default function Login(props) {
  return (
    <div className="parent">
      <div className="form">
        <h2> Login</h2>
        {props.invalidlogin ? (
          <p style={{ color: "red" }}>Invalid email or password, try again! </p>
        ) : (
          ""
        )}
        <div className="input">
          <div className="inputBox">
            <label>Email</label>
            <input
              type="email"
              id="input"
              onChange={(e) => {
                props.changeEmail(e);
              }}
              placeholder="enter your email"
              required
            />
          </div>
          <div className="inputBox">
            <label>Password</label>
            <input
              type="password"
              id="input1"
              onChange={(e) => {
                props.changePassword(e);
              }}
              placeholder="enter your password"
            />
          </div>
          <div className="inputBox">
            <input
              type="submit"
              defaultValue="Sign In"
              onClick={() => props.goLogin()}
            />
          </div>
        </div>
        <p className="forgot">
          go to Sign up <NavLink to={"/signupuser"}>click here</NavLink>
        </p>
      </div>
    </div>
  );
}
