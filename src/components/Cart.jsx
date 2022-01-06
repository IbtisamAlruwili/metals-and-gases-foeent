// import React, { useEffect, useState } from 'react'
// import CartItem from './CartItem'
// import Footer from './Footer'
// import Navbar from './Navbar'

// export default function Cart(props) {
//     const [cartArray, setcartArray] = useState([])
//     useEffect(() => {
//         setcartArray(props.cartArray)
//     }, [])

// let objectAtCart = props;
// console.log(objectAtCart.cartArray[0])
//     return (
//         <>
//         <Navbar/>
//             <div className='vh-75'>
//             <div className="container py-5 ">
//                 <div className="row">
//                 {cartArray.map((objectAtCart,index)=> <CartItem key={index}  objectAtCart={objectAtCart}/>)} 
//                 </div>
//             </div>
//             </div>
//         <Footer/>
//         </>
//     )
// }
