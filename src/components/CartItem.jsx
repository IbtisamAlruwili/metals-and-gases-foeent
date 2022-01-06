import React, { useState, useEffect } from "react";
import axios from "axios";
// import { BsFillHeartFill } from "react-icons/bs";

export default function CartItem({ token }) {
  const [cart, setCart] = useState([]);

  useEffect(async () => {
    //   console.log("ebtesam");
    try {
      if (token) {
        const reult = await axios.get("https://metalapi.herokuapp.com/products", {
          headers: { authorization: "Bearer " + token },
        });    
        
        setCart(reult.data);
        console.log(reult.data);
      }
    } catch (error) {
    //   console.log(error.response.data);
    }
  }, [token]);
 
  const removeCart = async (id,i) => {
    const result = await axios.delete(`https://metalapi.herokuapp.com/unlike/${id}`, {
      headers: { authorization: "Bearer " + token },
    });
    const copied = [...cart]
    copied.splice(i,1)
    setCart(copied);

  };
console.log("e");
  return (

    <div>
        
      {cart.map((elem, i) => {
        return (
          <div>
            <p> {elem.name}</p>
            <p> {elem.price}</p>
            <img src={elem.img} alt="no img" />
            {/* <BsFillHeartFill */}
             <div className="Cart"
              onClick={() => {
                removeCart(elem._id,i);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}








// import React from 'react'

// export default function CartItem(props) {
   
//     return (
   
          
//                 <div   className="col-md-3 px-2 my-2 ">
//                         <div style={{ border: "1px solid #444", borderRadius: "5px" }} className="item ">
//                             {/* <img style={{ height: "150px" }} className='w-100 ' height="100%" src={props.objectAtCart.img_url} alt="not found" /> */}
//                             <h2>{props.objectAtCart.name} </h2>
//                             <h2>{props.objectAtCart.description} </h2>
//                             <button className='btn btn-danger'>Delete</button>
//                         </div>
//                 </div>

          
//     )
// }
