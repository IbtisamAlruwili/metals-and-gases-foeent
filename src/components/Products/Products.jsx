import "./Products.css";
import { NavLink } from "react-router-dom";
import explorationVideo from "../videos/production ID_5055608.mp4";
import img1 from "../images/kT1yJX5.jpg";
import img2 from "../images/pexels-anamul-rezwan-1145434.jpg";
import img3 from "../images/pexels-athena-3417668.jpg";
import img4 from "../images/pexels-lalesh-aldarwish-147635.jpg";
import img5 from "../images/pexels-mitchell-luo-3685210 (1).jpg";
import img6 from "../images/pexels-vedanti-242616.jpg";
import img7 from "../images/pexels-väinö-parjanen-3853870.jpg";
import img8 from "../images/pexels-pixabay-327049.jpg";
import img9 from "../images/pexels-pixabay-266896.jpg";
import img10 from "../images/pexels-pixabay-220237.jpg";
import img11 from "../images/pexels-pixabay-73833.jpg";
import img12 from "../images/pexels-pixabay-327041.jpg";

import { useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
export default function Products(props) {
  const [imgsArr, setimgsArr] = useState([
    { img: img1, title: "It is a natural compound formed through geological processes. The word refers not only to the chemical compound, but to the metallic structure as well. " },
    { img: img2, title: "Shearing is the process of cutting metal without producing a blade. The types of shearing differ according to the type of blade, and one of the most .  " },
    { img: img3, title: "the Rare metals are used in many industries, and the distinction and enjoyment of rare metals due to their high electrical and magnetic conductivity has  . " },
    { img: img4, title: " the  Mineral can be defined as a solid and inorganic substance found naturally in the earth, with a distinctive or variable chemical composition.          " },
    { img: img5, title: "  Metal is a substance that is found in nature and no human, animal or plant has entered into its composition. We also note that the chemical compositio" },
    { img: img6, title: "It is a gas that has no odor or color, and the smell that emanates from it is just some substances added to it to distinguish it. It is lighter than air,"},
    { img: img7, title:"It is used in power plants, where gas is burned and the resulting energy is used to generate electric power, which man cannot do without in our modern age"},
    { img: img8, title:"We must know the crystal structure that controls many of the natural properties of a mineral such as hardness, streaks, specific weight and color.        "},
    { img: img9, title: "It is a gas that has no odor or color, and the smell that emanates from it is just some substances added to it to distinguish it. It is lighter than air,"},
    { img: img10, title: "Carbon is found in nature in the form of diamond, which is the hardest known mineral. It is also found in the form of graphite, which is one of theleast"},
    { img: img11, title:"Description of more than two thousand different minerals, but all the common minerals that enter into the composition of rocks, as well as economic miner"},
    { img: img12, title: "It is considered an economic wealth as it provides a high material income for the individual, increases the standard of living, and returns to the state"},
  ]);
  return (
    <>
      <div className="exploration-intro">
        <Navbar logOut={props.logOut} />
        <video
          className="w-100"
          autoPlay
          muted
          src={explorationVideo}
          type="video/mp4"
        ></video>
        <div className="intro-text">
          <h2 className="fs-sm-4">
            Welcome To <span className="main-color">Website</span>
          </h2>
          <p>
            We’re an architectural metal company that makes and installs
            building facades, decorative exteriors, custom railing, and really
            anything architectural you can imagine with metal.
          </p>
        </div>
      </div>
            <div  >
      <div className="container-fluid">
        <div className="row">
          {imgsArr.map((item) => (
            <div className="col-sm-12 col-md-4 col-lg-3 explore-item">
              <div
                style={{ backgroundColor: "#333" }}
                className="item text-center  text-light"
              >
                <img
                  className=" w-100 "
                  height="300px"
                  src={item.img}
                  alt="not found "
                />
              </div>
              <div>
                <p>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div></div>
      <Footer />
    </>
  );
}
