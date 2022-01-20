import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import myImg from "../images/img.png";
import MetalItems from "./MetalItems";
import ProgressBar from "./ProgressBar";

export default function Metal(props) {
  const [metals, setmymetals] = useState([]);
  const [token, settoken] = useState(props.token); //
  const [inputValue, setinputValue] = useState("");
  // const [itemObject, setitemObject] = useState({})
  const [add, setadd] = useState(false);
  const [imgUrl, setimgUrl] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [price, setPrice] = useState("");

  const [forminput, setforminput] = useState(false);
  const [search, setsearch] = useState("");
  const [clear, setclear] = useState(false);
  /////////////////////////////////////////////////
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ["image/png", "image/jpeg"];
  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpg)");
    }
    setimgUrl(e.target.value);
  };
  ///////////////////////////////////////////////////////
  useEffect(async () => {
    try {
      const result = await axios.get(
        `https://metal-gases-api.herokuapp.com/products`,
        { headers: { authorization: "Bearer " + token } }
      );
      setmymetals(result.data.metal);
    } catch (error) {
      // console.log(error);
    }
    if (props.token) {
      // هذي للتاكيد بس
      settoken(props.token);
    }
  }, []);
  /////////////////////////////////////////////////////////////////////////////////////
  const getData = async () => {
    // سويت ديستراكتنج للداتا اللي راجعه من ال اي بي اي
    let { data } = await axios.get(
      `https://metal-gases-api.herokuapp.com/products`,
      { headers: { authorization: "Bearer " + token } }
    );
    console.log("Metal.jsx line 38 getData function", { data });
    setmymetals(data.metal);
  };

  const addMetal = async (e) => {
    e.preventDefault(); // هذي تمنع ان الصفحه يصيرلها refresh عند الضغط علي الزر
    if (nameValue !== "" && descValue !== "") {
      const response = await axios.post(
        "https://metal-gases-api.herokuapp.com/metal",
        {
          name: nameValue,
          description: descValue,
          img_url: imgUrl,
          price: price,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
    }
    getData(); // هذي علشان احدث او اجيب الداتا
    setadd(false);
  };

  const deleteMetal = async (id) => {
    // ال اي دي هذي اللي هنا هذا جاي من الفانكشمن اللي تحت
    let response = await axios.delete(
      `https://metal-gases-api.herokuapp.com/metal/${id}`,
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    getData();
  }; // هذي علشان احدث الداتا
  ////////////////////////////////////////////////////////////////////////////////
  const showForm = () => {
    setadd(true);
  };

  const getNameValue = (e) => {
    setNameValue(e.target.value); //يحط قيمة الانبوت ثم يظهره
  };

  const getDescValue = (e) => {
    setDescValue(e.target.value);
  };
  const getimgUrl = (e) => {
    setimgUrl(e.target.value);
  };
  const pricee = (e) => {
    setPrice(e.target.value);
  };
  //////////////////////
  const fav = async (id) => {
    try {
      console.log("fav is clicked inside metal.jsx line 104, id:", id);
      const result = await axios.post(
        // هذي تاخذ ثلاث براميتر
        `https://metal-gases-api.herokuapp.com/likee/${id}`,
        {},
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      console.log(result.data);
    } catch (error) {
      //   console.log(error.response.data);
    }
  };
  ///////////////////////////////////
  const searchTarget = (e) => {
    setsearch(e.target.value);
    if (e.target.value != "") {
      setclear(true);
    } else {
      setclear(false);
    }
  };

  const clearInput = () => {
    getData();
    setsearch("");
    setclear(!clear);
  };
  const search1 = (e) => {
    // getData();
    if (search) {
      let searchResult = metals.filter((item) => {
        if (item.name.toLowerCase().includes(search.toLocaleLowerCase())) {
          return item;
        }
      });
      setmymetals(searchResult);
    } else {
      getData();
    }

    console.log(metals);
  };
  console.log(metals);
  ////////////////////////////////////////////
  // jsx يظهر على براوزر تحت ريتيرن
  return (
    <div>
      <Navbar logOut={props.logOut} />
      <div className="breadcrump">
        <h1>Metal</h1>
      </div>

      <div className="inputSearch">
        <div className="inputGroup">
          <input
            placeholder="search"
            onChange={(e) => {
              searchTarget(e);
            }}
            value={search}
          />
          {clear ? (
            <button
              onClick={() => {
                clearInput();
              }}
            >
              <i class="fas fa-times"></i>
            </button>
          ) : (
            ""
          )}
        </div>

        <button
          onClick={() => {
            search1();
          }}
        >
          🔍
        </button>
      </div>
      {/* هنا لو موجود في الداتا ارراي ميتال وموجود فيها عناصر يرجع الديف لانه يرجع ترو  */}
      {metals && (
        <div className="container py-5 min-vh-100">
          <div className="row ">
            {/* فكرة ال toggle تختصر عليا الصفحات  */}

            <div className="row">
              {metals.map((item) => (
                <MetalItems
                  token={token}
                  getData={getData}
                  item={item}
                  forminput={forminput}
                  key={item._id}
                  deleteItem={deleteMetal}
                  isAdmin={props.isAdmin}
                  fav={fav}
                />
              ))}
            </div>
            <div>
              {props.isAdmin ? (
                <div className="mt-5">
                  {/* اذا هو ادمن بدخل الدف  */}
                  {!add ? (
                    <button onClick={showForm} className="addBtn">
                      Add New Metal
                    </button>
                  ) : (
                    <form
                      style={{
                        border: "1px solid #444",
                        borderRadius: "5px",
                        width: "50%",
                        margin: "0 auto",
                      }}
                      className="text-center shadow-lg pt-3 px-3"
                    >
                      {/* هذولي انا ارسلهن للباكيند اللي ب  */}
                      <input
                        onChange={getNameValue}
                        className="w-75 form-control mt-5 m-auto "
                        type="text"
                        placeholder="set the name"
                      />
                      <input
                        onChange={getDescValue}
                        className="w-75 form-control mt-2 m-auto"
                        type="text"
                        placeholder="set the description"
                      />
                      <input
                        onChange={pricee}
                        className="w-75 form-control mt-2 m-auto"
                        type="text"
                        placeholder="set the price"
                      />
                      <label>
                        <input type="file" onChange={handleChange} />
                      </label>
                      <div className="output">
                        {error && <div className="error">{error}</div>}
                        {file && <div>{file.name}</div>}
                        {file && (
                          <ProgressBar
                            file={file}
                            setFile={setFile}
                            setimgUrl={setimgUrl}
                          />
                        )}
                      </div>

                      <input
                        onChange={getimgUrl}
                        className="w-75 form-control mt-2 m-auto"
                        type="text"
                        placeholder="set the image url"
                      />
                      {/* ارسل للباكيند عشان اجيب البيانات */}
                      <button
                        onClick={addMetal}
                        className="btn btn-danger my-4 px-5"
                      >
                        Add
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
