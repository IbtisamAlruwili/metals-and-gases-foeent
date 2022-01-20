import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MetalItems(props) {
  const [nameInput, setnameInput] = useState(false);
  const [descInput, setdescInput] = useState(false);
  const [nameValue, setNameValue] = useState(props.item.name);
  const [descValue, setDescValue] = useState(props.item.description);
  // const [price, setPrice] = useState(props.item.price);

  const [token, settoken] = useState(props.token);
  const [itemObject, setitemObject] = useState({});
  const [myData, setmyData] = useState([]);

  // const [search, setsearch] = useState("");

  useEffect(() => {
    settoken(props.token);
    setitemObject(props.item);
    // setmyData(props.myData.metal)
  }, []);

  ///////////////////////////////////////////////////////////
  const deleteItem = async (id) => {
    let response = await axios.delete(
      `https://metal-gases-api.herokuapp.com/metal/${id}`,
      { headers: { authorization: "Bearer " + token } }
    );
    props.getData();
  };
  ////////////////////////////////////////////////////
  const editName = () => {
    setnameInput(!nameInput);
  };
  const editDesc = () => {
    setdescInput(!descInput);
  };
  const getNameValue = (e) => {
    setNameValue(e.target.value);
  };
  const getDescValue = (e) => {
    setDescValue(e.target.value);
  };

  const updateMetal = async (id) => {
    console.log(id);
    let response = await axios.put(
      `https://metal-gases-api.herokuapp.com/metal/${id}`,
      { name: nameValue, description: descValue },
      { headers: { Authorization: `Bearer ${props.token}` } }
    );
    setitemObject(response.data);
    setnameInput(false);
    setdescInput(false);
  };
  ////////////////////////////////////////////////////
  // const searchTarget = (e) => {
  //   setsearch(e.target.value);
  // };

  // const search1 = () => {
  //   const search11 = myData.filter
  //   (item => {
  //     if (item.nameValue.toLowerCase().includes(search.toLocaleLowerCase())) {
  //       return item;
  //     }
  //     console.log (item);
  //   });
  //   setmyData(search11);
  //   return search11;
  // };
  ////////////////////////////////////////////////////////
  return (
    <div className="col-sm-12 col-md-6 col-lg-4 mb-3 item">
      <div className="item-img">
        {props.isAdmin ? (
          <button
            onClick={() => deleteItem(itemObject._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        ) : (
          ""
        )}
        <img src={itemObject.img_url} className="w-100" alt="not found " />
      </div>
      <div className="item-info">
        {/* input update */}
        <div>
          {nameInput ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateMetal(itemObject._id);
              }}
              className="d-flex justify-content-around mx-1 mt-1"
            >
              <input
                className=" form-control border-none "
                onChange={getNameValue}
                type="text"
                defaultValue={itemObject.name}
              />
              <button className="rounded-1 p-1 fw-bold bg-danger text-light border-0">
                {" "}
                change{" "}
              </button>
            </form>
          ) : (
            ""
          )}
        </div>
        <div className="d-flex justify-content-between p-2">
          <h2>{itemObject.name}</h2>{" "}
          {props.isAdmin ? (
            <button onClick={editName} className="btn btn-success">
              Edit
            </button>
          ) : (
            ""
          )}
        </div>
        {/* input update */}
        <div>
          {descInput ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateMetal(itemObject._id);
              }}
              className="d-flex justify-content-around mx-1 mt-1"
            >
              <input
                className=" form-control border-none "
                onChange={getDescValue}
                type="text"
                defaultValue={itemObject.description}
              />
              <button className="rounded-1 p-1 fw-bold bg-danger text-light border-0">
                {" "}
                change{" "}
              </button>
            </form>
          ) : (
            ""
          )}
        </div>
        <div className="d-flex justify-content-between p-2">
          <p>{itemObject.description}</p>{" "}
          {props.isAdmin ? (
            <button onClick={editDesc} className="btn btn-success">
              Edit
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="d-flex justify-content-between p-2">
          <p className="bg-danger p-1 fs-5">
            Price: <span className="bg-danger">{itemObject.price} $</span>
          </p>{" "}
          {/* {props.isAdmin ? (
              <button onClick={editDesc} className="btn btn-success">
                Edit
              </button>
            ) : (
              ""
            )} */}
        </div>
        <button onClick={() => props.fav(itemObject._id)} className="cartBtn">
          Add To Cart
        </button>
      </div>
    </div>
  );
}
