// import  axios  from 'axios';
// import React, {  useEffect,useState } from 'react'
// import Footer from './Footer'
// import Navbar from './Navbar'
// import Item from './Item';

// export default function Metal(props) {
//     const [myData, setmyData] = useState({})
//     const [token, settoken] = useState(props.token)

    
//     async function getData() {
//         let {data} = await axios.get(`https://metalapi.herokuapp.com/products`, { headers: {"Authorization" : `Bearer ${token}`} });
//         console.log(data)
//         setmyData(data);
//     }

//     function getToken() {
//         if (props.token) {
//             settoken(props.token)
//         }
//     }

//     useEffect(() => {
//         getToken();
//         getData(); 
//     }, [])

  
//     return (
//         <div>
//             <Navbar />
//            {myData.exploration && <div className="container py-5 ">
//                 <div className="row ">
//                     <h2 className='mb-3'>Exploration :</h2>
//                     {myData.exploration.map((item, index) => <Item key={index} isAdmin={props.isAdmin} itemData={item} myData={myData.exploration} token={token}  index={index}/>)}
//                 </div>    
//             </div>}
//             <Footer/>
//         </div>
//     )
// }





















































// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react'
// // import Footer from './Footer'
// // import Navbar from './Navbar'
// // import myImg from "./images/img.png"

// // export default function Gases(props) {
// //    const [myData, setmyData] = useState({})
// // //    const [token, settoken] = useState(props.token)


// //     // async function getData() {
// //     //     let { data } = await axios.get(`https://metalapi.herokuapp.com/products`, { headers: { "Authorization": `Bearer ${token}` } });
// //     //     setmyData(data);
// //     // }
    
// //     // function getToken() {
// //     //     if (props.token) {
// //     //         settoken(props.token)
// //     //     }
// //     // }
// //     useEffect(() => {
// //         getData();
// //         // getToken();

// //     }, [])


// //     return (
// //         <div>
// //             <Navbar />
// //             {myData.gases && <div className="container py-5 ">
// //                 <div className="row">
// //                     <h2 className='mb-3'>Gases :</h2>
// //                     {myData.gases.map((item, index) => <div key={index} className="col-md-3 text-center">
// //                         <img src={myImg} className="w-100" style={{ height: "150px" }} alt="not found " />
// //                         <h2>{item.name} </h2> <p>{item.description}</p> </div>)}
// //                 </div>
// //             </div>}
// //             <Footer />
// //         </div>
// //     )
// // }
