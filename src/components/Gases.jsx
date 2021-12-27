import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import myImg from "./images/img.png"

export default function Gases(props) {
    const [myData, setmyData] = useState({})
    const [token, settoken] = useState(props.token)
    const [search, setSearch1] = useState("");
    const [imgUrl, setimgUrl] = useState('')
    const [nameValue, setNameValue] = useState('')
    const [descValue, setDescValue] = useState('')
/////////////////////////////////////////////////////////////////////////////////

    async function getData() {
        let { data } = await axios.get(`https://metalapi.herokuapp.com/products`,
         { headers: { "Authorization": `Bearer ${token}` } });
        setmyData(data);
    }

    function getToken() {
        if (props.token) {
            settoken(props.token)
        }
    }
    useEffect(() => {
        getData();
        getToken();

    }, [])


///////////////////////////////////////////////////////////////////
     const search1=(e)=>{
        setSearch1(e.target.value);
     }
     
     function getNameValue(e) {
        setNameValue(e.target.value);
    }

    function getDescValue(e) {
        setDescValue(e.target.value);
    }
    function getimgUrl(e) {
        setimgUrl(e.target.value);
    }

      
/////////////////////////////////////////////////////////////////

async function addMetal(e) {
    e.preventDefault();  // دي بتمنع ان الصفحه يتعملها refresh عند الضغط علي الزر
    if (nameValue !== "" && descValue !== "") {   //لازم يكون الاسم والوصف متعبيات مهن فاضيات
        const response = await axios.post("https://metalapi.herokuapp.com/metal", {
            name: nameValue,
            description: descValue,
            img_url: imgUrl
        }, { headers: { "Authorization": `Bearer ${token}`} });

    }
    getData();
    setadd();
}


async function deleteItem(id) {
    let response = await axios.delete(`https://metalapi.herokuapp.com/gases/${id}`
        , { headers: { "Authorization": `Bearer ${token}` } }
    )
    getData()
}



    // const search1 = () => {
    //     const search1 = myData.filter((element) => {
    //       if (element.name.toLowerCase().includes(search.toLocaleLowerCase())) {
    //         return element;
    //       }
    //       console.log(element);
    //     });
    //     setmyData(search1); // حط القيمة اللي لقيتها 
    //     return search1;  //ترجع قيمة البحث 
    //   };
    

    return (
        <div>
            <Navbar />
 {/* <div id="inputSearch"/><input placeholder="search"
 onChange={(e) => {searchTarget(e)}}/><button onClick={() => {search1();}}>🔍</button> */}
                                     
                                                                                   
            {myData.gases && <div className="container py-5 ">
                <div className="row">
                    <h2 className='mb-3'>Gases :</h2>
                    {myData.gases.map((item, index) => <div key={index} className="col-md-3 text-center">
                        <img src={myImg} className="w-100" style={{ height: "150px" }} alt="not found " />
                        <h2>{item.name} </h2> <p>{item.description}</p> </div>)
                        } <button onClick={addMetal} className='btn btn-danger my-4 px-5'>Add</button>
                             {isAdmin ? <div className='col-md-3 mb-4'>
                        {add ?<form style={{ border: "1px solid #444", borderRadius: "5px" }} className="text-center shadow-lg pt-3 px-3">
                                <input onChange={getNameValue} className='w-75 form-control mt-5 m-auto ' type="text" placeholder='set the name' />
                                <input onChange={getDescValue} className='w-75 form-control mt-2 m-auto' type="text" placeholder='set the description' />
                                <input onChange={getimgUrl} className='w-75 form-control mt-2 m-auto' type="text" placeholder='set the image url' />
                                <button onClick={addMetal} className='btn btn-danger my-4 px-5'>Add</button>
                            </form>: <button onClick={showForm} className='btn btn-secondary'>Add New Metal</button> 
                            
                        }
                    </div> : ""
                    }
                </div>
            </div>     }
            <div/>
            <Footer />
        </div>
    )
}
