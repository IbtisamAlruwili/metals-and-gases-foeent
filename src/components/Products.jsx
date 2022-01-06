
import "./Navbar.css"
import {  NavLink } from 'react-router-dom';
import explorationVideo from "../../src/Components/videos/production ID_5055608.mp4"
import img1 from "../Components/images/kT1yJX5.jpg"
import img2 from "../Components/images/pexels-anamul-rezwan-1145434.jpg"
import img3 from "../Components/images/pexels-athena-3417668.jpg"
import img4 from "../Components/images/pexels-lalesh-aldarwish-147635.jpg"
import img5 from "../Components/images/pexels-mitchell-luo-3685210 (1).jpg"
import img6 from "../Components/images/pexels-vedanti-242616.jpg"
import img7 from "../Components/images/pexels-väinö-parjanen-3853870.jpg"
import img8 from "../Components/images/pexels-pixabay-327049.jpg"
import img9 from "../Components/images/pexels-pixabay-266896.jpg"
import img10 from "../Components/images/pexels-pixabay-220237.jpg"
import img11 from "../Components/images/pexels-pixabay-73833.jpg"
import img12 from "../Components/images/pexels-pixabay-327041.jpg"

import { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
export default function Products() {

  const [imgsArr, setimgsArr] = useState([img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12])
    return (
        <>
       <Navbar/>
        <div className="explorationView">
            <video className='w-100 vh-75' autoPlay  muted src={explorationVideo} type="video/mp4"></video> 
      </div>
      <div className="   py-3">
                <div className="container-fluid">
                    <div className="row px-5">
                        {imgsArr.map((item)=> <div className="col-md-3 mb-4">
                            <div style={{borderRadius:"25px " ,backgroundColor:"#333"}} className="item text-center  text-light">
                               <img style={{borderRadius:"25px "}} className=" w-100 " height="300px" src={item} alt="not found " />
                               <h5 className="my-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident, commodi.</h5>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
            <Footer/>
      </>
    )
}
