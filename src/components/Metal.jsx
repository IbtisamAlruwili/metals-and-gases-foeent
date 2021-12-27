import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import myImg from "./images/img.png"


export default function Metal(props) {
    const [myData, setmyData] = useState({})
    const [isAdmin,setisAdmin] = useState(props.isAdmin);  //مررت الادمن ك props
    const [token, settoken] = useState(props.token)        //مررت التوكن props
    const [forminput, setforminput] = useState(false)//خليت قيمته كذا علشان تحت اذا كان ادمن وضغط يصير صح ويفتح الفورم 
    const [inputValue, setinputValue] = useState("");
    // const [itemObject, setitemObject] = useState({})
     


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

    ////////////////////////////////////////////////////////////////////

    const [add, setadd] = useState(false)
    const [imgUrl, setimgUrl] = useState('')
    const [nameValue, setNameValue] = useState('')
    const [descValue, setDescValue] = useState('')
    const [search, setsearch] = useState("");

    function showForm() {
        setadd(true)
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
    const searchTarget = (e) => {
        setsearch(e.target.value);
      };
    // 
    
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
        setadd(false);
    }

    async function deleteItem(id) {
        let response = await axios.delete(`https://metalapi.herokuapp.com/metal/${id}`
            , { headers: { "Authorization": `Bearer ${token}` } }
        )
        getData()
    }

    
    function editName() {
        setforminput(!forminput)
    }
    let updateItem = (e) => {
        e.preventDefault();  //هذي ماتسوي تحديث 
        changeValue(inputValue,e.target);
    }
    function changeValue(value,input) {
        input.value=value
        setforminput(false);
    }
    function setValue(e) {
        setinputValue(e.target.value);
    }


    const search1 = () => {
        const search1 = myData.filter((element) => {
          if (element.name.toLowerCase().includes(search.toLocaleLowerCase())) {
            return element;
          }
          console.log(element);
        });
        setmyData(search1); // حط القيمة اللي لقيتها 
        return search1;  //ترجع قيمة البحث 
      };

    return (
        <div>
            <Navbar />
            <div id="inputSearch"/><input placeholder="search"
         onChange={(e) => {searchTarget(e); }}/><button onClick={() => {search1();}}>🔍</button>
            {myData.metal && <div className="container py-5 ">
                         
                <div className="row ">
                    <h2 className='mb-3'>Metal :</h2>

                    {myData.metal.map((item, index) =>
                        <div className="col-md-3 mb-4" key={index} >

                            <div style={{ border: "1px solid #444", borderRadius: "5px" }} className='text-center shadow-lg position-relative'>
                             {/*  اذا كان ادمن يطلع زر الحذف واذا لا يكون فاضي  */}
                                {isAdmin ? <button onClick={() => deleteItem(item._id)} className='bg-warning position-absolute p-1 border-1 rounded-3'>Delete</button>
                                    : ""}
                                <img src={item.img_url} className="w-100" style={{ height: "150px" }} alt="not found " />
                                
                                <div>
                                     {/*  اذا كان ادمن وضغط زر التحديث يطلع فورم التحديث واذا لا يكون فاضي  */}
                                       {forminput ? <form onSubmit={updateItem} className='d-flex justify-content-around mx-1 mt-1'>
                                        <input className=' form-control border-none ' onChange={setValue} type="text"  />
                                        <button className='rounded-1 p-1 fw-bold bg-danger text-light border-0'> change </button>
                                    </form> : ''}
                                </div>
                                <h2>{item.name} </h2>  {isAdmin ? <button onClick={editName} className='btn-secondary rounded-start rounded-end px-2'>Edit</button> : ''}
                                <p>{item.description}</p>
                            </div>

                        </div>)
                    }

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


            </div>
            }

            <Footer />
        </div>
    )
}





