import React from "react";
import "./Footer.css";
export default function Footer() {
  return (
    <div className="Foot">
      <h2>
        <span className="sc-color">Metal</span> &{" "}
        <span className="main-color">Gases</span>
      </h2>
      <ul className="footer-nav">
        <li>
          <a href="/home">
            Home
            <i className="fas fa-arrow-right"></i>
          </a>
        </li>
        <li>
          <a href="/products">
            Exploration
            <i className="fas fa-arrow-right"></i>
          </a>
        </li>
        <li>
          <a href="/gases">
            Gases
            <i className="fas fa-arrow-right"></i>
          </a>
        </li>
        <li>
          <a href="/metal">
            Metal
            <i className="fas fa-arrow-right"></i>
          </a>
        </li>
      </ul>
      <ul className="social">
        <li>
          <a href="" className="facebook">
            <i class="fab fa-facebook-f"></i>
          </a>
        </li>
        <li>
          <a href="" className="twitter">
            <i class="fab fa-twitter"></i>
          </a>
        </li>
        <li>
          <a href="" className="google">
            <i class="fab fa-google"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}
