import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import myImg from "../images/img.png";
import GasesItems from "./GasesItems";
import ProgressBar from "./ProgressBar";

export default function Gases(props) {
  const [gases, setgases] = useState([]);
  const [token, settoken] = useState(props.token);
  const [add, setadd] = useState(false);
  const [imgUrl, setimgUrl] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [price, setPrice] = useState("");

  const [search, setsearch] = useState("");
  const [clear, setclear] = useState(false);
  ///////////////////////////////////////////////////////////////
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
  //////////////////////////////////////////////////////////////
  useEffect(async () => {
    try {
      const result = await axios.get(
        `https://metal-gases-api.herokuapp.com/products`,
        { headers: { authorization: "Bearer " + token } }
      );
      setgases(result.data.gases);
    } catch (error) {
      console.log(error);
    }
    if (props.token) {
      //للتاكيد
      settoken(props.token);
    }
  }, []);
  useEffect(() => {
    setgases(gases);
  }, [gases]);
  //////////////////////////////////////////////
  const getData = async () => {
    let { data } = await axios.get(
      `https://metal-gases-api.herokuapp.com/products`,
      { headers: { authorization: "Bearer " + token } }
    );
    setgases(data.gases);
  };
  const addGases = async (e) => {
    e.preventDefault();
    if (nameValue !== "" && descValue !== "") {
      // لازم يعبي
      const response = await axios.post(
        "https://metal-gases-api.herokuapp.com/gases",
        {
          name: nameValue,
          description: descValue,
          img_url: imgUrl,
          price: price,
        },
        { headers: { authorization: "Bearer " + token } }
      );
    }
    getData();
    setadd(false);
  };

  const deleteItem = async (id) => {
    //// ال اي هذي اللي هنا هذا جاي من الفانكشمن اللي تحت
    let response = await axios.delete(
      `https://metal-gases-api.herokuapp.com/gases/${id}`,
      { headers: { authorization: "Bearer " + token } }
    );
    getData();
  };
  ////////////////////////////////////////////////////////////////
  const showForm = () => {
    setadd(true);
  };
  const getNameValue = (e) => {
    setNameValue(e.target.value);
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
  ////////////////////////////////////////////////

  ////////////////////////////////////////
  const fav = async (id) => {
    try {
      console.log("fav is clicked inside gas.jsx line 118, id:", id);
      const result = await axios.post(
        `https://metal-gases-api.herokuapp.com/likeeGases/${id}`,
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
  //////////////////////////////////////
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
      let searchResult = gases.filter((item) => {
        if (item.name.toLowerCase().includes(search.toLocaleLowerCase())) {
          return item;
        }
      });
      setgases(searchResult);
    } else {
      getData();
    }

    console.log(gases);
  };
  console.log(gases);
  /////////////////////////////////////////////////////
  return (
    <div>
      <Navbar logOut={props.logOut} />
      <div className="breadcrump">
        <h1>Gases</h1>
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
      {gases && (
        <div className="container py-5 min-vh-100">
          <div className="row ">
            <div className="row">
              {gases.map((item) => (
                <GasesItems
                  token={token}
                  getData={getData}
                  item={item}
                  key={item._id}
                  deleteItem={deleteItem}
                  fav={fav}
                  isAdmin={props.isAdmin}
                />
              ))}
            </div>
            {props.isAdmin ? (
              <div className="mt-5">
                {!add ? (
                  <button onClick={showForm} className="addBtn">
                    Add New Gas
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
                    <button
                      onClick={addGases}
                      className="btn btn-danger my-4 px-5"
                    >
                      Add
                    </button>
                  </form>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
