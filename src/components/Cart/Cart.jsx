import React, { useEffect, useState } from "react";
import axios from "axios";
import CartMetal from "./CartMetal";
import CartGas from "./CartGas";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function Cart(props) {
  const [cartArray, setcartArray] = useState([]);
  const [cartGases, setcartGases] = useState([]);
  let [cartItems, setcartItems] = useState([]);
  let [uniqeItems, setuniqeItems] = useState([]);
  let [uniqueMetals, setuniqueMetals] = useState([]);
  let [uniqueGases, setuniqueGases] = useState([]);
  const [token, setToken] = useState(props.token); // بيجيب التوكن من البروبز
  ////////////////////////////////////////////////
  // بيجيب الداتا من الكارت

  useEffect(async () => {
    try {
      const result = await axios.get(
        `https://metal-gases-api.herokuapp.com/like`,
        { headers: { authorization: "Bearer " + token } }
      );
      setcartArray(result.data);
    } catch (error) {
      console.log(error);
    }
    if (token) {
      //للتاكيد
      setToken(token);
    }
  }, []);
  console.log(cartArray);
  useEffect(async () => {
    try {
      const response = await axios.get(
        `https://metal-gases-api.herokuapp.com/likeGases`,
        { headers: { authorization: "Bearer " + token } }
      );
      setcartGases(response.data);
    } catch (error) {
      console.log(error);
    }
    if (token) {
      //للتاكيد
      setToken(token);
    }
  }, []);
  console.log(cartGases);
  /////////////////////////////////////////////////

  const getMetalData = async () => {
    let { data } = await axios.get(
      `https://metal-gases-api.herokuapp.com/like`,
      { headers: { authorization: "Bearer " + token } }
    );
    setcartArray(data);
  };
  const geGasData = async () => {
    let { data } = await axios.get(
      `https://metal-gases-api.herokuapp.com/likeGases`,
      { headers: { authorization: "Bearer " + token } }
    );
    setcartGases(data);
  };

  ////////////////////////////////////////////////

  const unique = (items) => {
    items.forEach((item) => {
      let count = 1;
      items.forEach((x) => {
        if (item._id == x._id && items.indexOf(item) != items.indexOf(x)) {
          count++;
        }
      });
      let i = {
        id: item._id,
        name: item.name,
        description: item.description,
        img: item.img_url,
        itemsCount: count,
        price: item.price,
      };
      cartItems.push(i);
    });
    uniqeItems = [
      ...cartItems
        .reduce((map, obj) => map.set(obj.id, obj), new Map())
        .values(),
    ];
    setcartItems([]);
    setuniqeItems(uniqeItems);
    return uniqeItems;
  };
  useEffect(() => {
    setuniqueMetals(unique(cartArray));
  }, [cartArray]);
  useEffect(() => {
    setuniqueGases(unique(cartGases));
  }, [cartGases]);

  return (
    <>
      <Navbar logOut={props.logOut} />
      <div className="vh-100">
        <div className="container py-5 ">
          <div className="row">
            {uniqueMetals?.map((item, index) => (
              <CartMetal
                key={item.id}
                item={item}
                token={token}
                getMetalData={getMetalData}
                geGasData={geGasData}
              />
            ))}
            {uniqueGases?.map((item, index) => (
              <CartGas
                key={item.id}
                item={item}
                token={token}
                getMetalData={getMetalData}
                geGasData={geGasData}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
