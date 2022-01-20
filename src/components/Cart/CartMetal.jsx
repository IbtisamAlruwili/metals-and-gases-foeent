import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import welcomeImage from "../images/kT1yJX5.jpg";
// import { BsFillHeartFill } from "react-icons/bs";

export default function CartItem(props) {
  const [cart, setCart] = useState([]);
  const [cartItem, setcartItem] = useState(props.item);

  // حذف االعنصر من الكارت
  const deleteCartItem = async (id) => {
    console.log(id);
    let response = await axios.delete(
      `https://metal-gases-api.herokuapp.com/unlike/${id}`,
      { headers: { authorization: "Bearer " + props.token } }
    );

    props.getMetalData();
  };

  return (
    <>
      <div
        key={cartItem.id}
        style={{ borderRadius: "10px" }}
        className="col-sm-12 col-md-6 col-lg-3 mb-3 my-2"
      >
        <div
          style={{ borderRadius: "10px" }}
          className="photo_container bg-light p-2 w-100 h-100 "
        >
          <img
            style={{ borderRadius: "5px", height: "150px" }}
            src={cartItem.img}
            className="w-100 "
            alt="not found"
          />
          <div className="py-3">
            <h4>{cartItem.name}</h4>
            <p style={{ lineHeight: "18px", fontSize: "15px" }}>
              {cartItem.description}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <div> Count: {cartItem.itemsCount}</div>
            <div>Total: {cartItem.itemsCount * parseInt(cartItem.price)}$</div>
          </div>
          <button
            onClick={() => deleteCartItem(cartItem.id)}
            className="btn btn-danger"
          >
            delete
          </button>
        </div>
      </div>
    </>
  );
}
