import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import myImg from "./images/img.png"

export default function Metal(props) {
    const [myData, setmyData] = useState({})
    const [isAdmin] = useState(props.isAdmin);
    const [token, settoken] = useState(props.token)
    // const [forminput, setforminput] = useState(false)
    // const [inputValue, setinputValue] = useState("");
    const [itemObject, setitemObject] = useState("")
    const [add, setadd] = useState(false)
    const [imgUrl, setimgUrl] = useState('')
    const [nameValue, setNameValue] = useState('')
    const [descValue, setDescValue] = useState('')

 
    console.log(token, "token");

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

    const showForm=()=> {
        setadd(true)
    }
    const getNameValue = (e) => {
        setNameValue(e.target.value)};   //يحط قيمة الانبوت ثم يظهره 
      
      const getDescValue=(e)=> {
        setDescValue(e.target.value)}

    const getimgUrl=(e)=> {
        setimgUrl(e.target.value) }
    ///////////////////////////////////////////////////
    const addMetal=async(e)=>{
        e.preventDefault();  // هذي تمنع ان الصفحه يصيرلها refresh عند الضغط علي الزر
        if (nameValue !== "" && descValue !== "") {  
            const response = await axios.post("https://metalapi.herokuapp.com/metal", {
                name: nameValue,
                description: descValue,
                img_url: imgUrl }, 
            { headers: { authorization: "Bearer " + token } });}
        getData();  // هذي علشان احدث او اجيب الداتا 
        setadd(false);
    }
/////////////////////////////////////////////////////////
     const deleteItem=async(id)=> { // ال اي دي اللي هنا هذا جاي من الفانكشمن اللي تحت 
        let response = await axios.delete(`https://metalapi.herokuapp.com/metal/${id}`
            , 
            { headers: { authorization: "Bearer " + token } 
               })
             getData() // هذي علشان احدث الداتا 
    }
    ///////////////////////////////////////////////////////
    
  const changee = (e) => {
    setitemObject(e.target.value);
  };
  const updateDesc= async (id)=>{   // فنكشن  للتعديل  
   try {
      const Update = await axios.put(`https://metalapi.herokuapp.com/metal/${id}`,{
        description:itemObject }
      ,{  headers:{authorization:"Bearer " + token},},);
      setmyData(Update.data)
    } catch (error) {
      console.log("err");
    }  getData() // هذي علشان احدث الداتا 

  };


    return (
        
        <div>
            <Navbar />
            {/* هنا لو موجود في الداتا ارراي ميتال وموجود فيها عناصر يرجع الديف لانه يرجع ترو  */}
            {myData.metal && <div className="container py-5 ">

                <div className="row ">
                    {/* فكرة ال toggle تختصر عليا الصفحات  */}
                    <h2 className='mb-3'>Metal :</h2>

                    {myData.metal.map((item, index) =>
                        <div className="col-md-3 mb-4" key={index} >

                            <div style={{ border: "1px solid #444", borderRadius: "5px" }} className='text-center shadow-lg position-relative'>
                                {isAdmin ? <button onClick={() => deleteItem(item._id)} className='bg-warning position-absolute p-1 border-1 rounded-3'>Delete</button>
                                    : ""}
                                <img src={item.img_url} className="w-100" style={{ height: "150px" }} alt="not found " />
                                
                                <div>
                                     {/* علشان يظهر الفورم هذي لازم يكون ال فورم انبت ب ترو 
                                    {forminput ? <form onClick={updateItem} className='d-flex justify-content-around mx-1 mt-1'>
                                        <input className=' form-control border-none ' onChange={setValue} type="text"  />
                                        <button className='rounded-1 p-1 fw-bold bg-danger text-light border-0'> change </button>
                                    </form> : ''} */}
                                    <input onChange={(e)=>{changee(e)}}></input>
                                     <button onClick={()=>{updateDesc(item._id)}}>upDate</button> 

                                </div>
                                {/* <h2>{item.name} </h2>  {isAdmin ? <button onClick={editName} className='btn-secondary rounded-start rounded-end px-2'>Edit</button> : ''} */}
                                <p>{item.description}</p>
                            </div>

                        </div>)
                    }

                    {isAdmin ? <div className='col-md-3 mb-4'>
                        {/* اذا هو ادمن بدخل الدف  */}
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
