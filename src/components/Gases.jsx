import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import myImg from "./images/img.png"

export default function Gases(props) {
    const [myData, setmyData] = useState({})
    const [token, settoken] = useState(props.token)



    useEffect(async () => {
        try {
            const result = await axios.get(`https://metalapi.herokuapp.com/products`,
              { headers: { authorization: "Bearer " + token }, } );
            setmyData(result.data);
          } catch (error) {
            console.log(error);
          }
          if (props.token) {  // هذي للتاكيد بس 
            settoken(props.token)
        }
    }, [])
    ////////////////////////////////////////////////////
    const getData = async() =>{
        // سويت ديستراكتنج للداتا اللي راجعه من ال اي بي اي 
        let { data } = await axios.get(`https://metalapi.herokuapp.com/products`,
         {  headers: { authorization: "Bearer " + token } });
        setmyData(data) }



    return (
        <div>
            <Navbar />
             {/* هنا لو موجود في الداتا ارراي ميتال وموجود فيها عناصر يرجع الديف لانه يرجع ترو  */}
            {myData.gases && <div className="container py-5 ">
                <div className="row">
                    <h2 className='mb-3'>Gases :</h2>
                    {myData.gases.map((item, index) => <div key={index} className="col-md-3 text-center">
                        <img src={myImg} className="w-100" style={{ height: "150px" }} alt="not found " />
                        <h2>{item.name} </h2> <p>{item.description}</p> </div>)}
                </div>
            </div>}
            <Footer />
        </div>
    )
}
