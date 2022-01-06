import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import myImg from "./images/img.png"
import MetalItems from './MetalItems';


export default function Metal(props) {
    const [myData, setmyData] = useState({})
    const [isAdmin] = useState(props.isAdmin); //
    const [token, settoken] = useState(props.token) //
    const [inputValue, setinputValue] = useState("");
    // const [itemObject, setitemObject] = useState({})
    const [add, setadd] = useState(false)
    const [imgUrl, setimgUrl] = useState('')
    const [nameValue, setNameValue] = useState('')
    const [descValue, setDescValue] = useState('')
    const [forminput, setforminput] = useState(false)

    useEffect(async () => {
        try {
            const result = await axios.get(`https://metalapi.herokuapp.com/products`,
              {headers: { authorization: "Bearer " + token }, });
            setmyData(result.data);
          } catch (error) {
            // console.log(error);
          }
        if (props.token) { // هذي للتاكيد بس 
            settoken(props.token)
        }
    }, [])
/////////////////////////////////////////////////////////////////////////////////////
    const getData=async() =>{
        // سويت ديستراكتنج للداتا اللي راجعه من ال اي بي اي 
       let { data } = await axios.get(`https://metalapi.herokuapp.com/products`,
        {  headers: { authorization: "Bearer " + token },});
       setmyData(data);}

     const addMetal= async(e) =>{
        e.preventDefault();  // هذي تمنع ان الصفحه يصيرلها refresh عند الضغط علي الزر
        if (nameValue !== "" && descValue !== "") {
            const response = await axios.post("https://metalapi.herokuapp.com/metal", {
                name: nameValue,
                description: descValue,
                img_url: imgUrl
            }, {headers: { authorization: "Bearer " + token }
        });

        }
        getData();// هذي علشان احدث او اجيب الداتا 
        setadd(false);
    }

const deleteMetal = async(id) =>{ // ال اي دي هذي اللي هنا هذا جاي من الفانكشمن اللي تحت
    let response = await axios.delete(`https://metalapi.herokuapp.com/metal/${id}`,{
        headers: { authorization: "Bearer " + token }  }
    );
    getData()}// هذي علشان احدث الداتا
////////////////////////////////////////////////////////////////////////////////
const showForm=()=> {
    setadd(true)
}

const getNameValue=(e)=> {
    setNameValue(e.target.value); //يحط قيمة الانبوت ثم يظهره 
}

const getDescValue=(e)=> {
    setDescValue(e.target.value);
}
const getimgUrl=(e)=> {
    setimgUrl(e.target.value);
}
//////////////////////
    //   const updateItem = (e) => {
    //     e.preventDefault();   //
    //     changeValue(inputValue, e.target); // يستدعي انبوت من فوق حاطته وتمتلي من القيمه اللي يدخلها اليوزرسيتفاليو
    // }
    // const changeValue=()=> {
    //     input.value = value//
    //     setforminput(false);//
    // }
    const editName=() =>{
        setforminput(!forminput)//
    }
    const setValue=(e) =>{
        setinputValue(e.target.value);//
    }
    //////////////////////
    const fav = async (id) => {
        try {
          const result = await axios.post(
              
            `http://localhost:5000/likee/${id}`,
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
    
    
    return (
        <div>
            <Navbar />
    {/* هنا لو موجود في الداتا ارراي ميتال وموجود فيها عناصر يرجع الديف لانه يرجع ترو  */}
            {myData.metal && <div className="container py-5 ">

                <div className="row ">
              {/* فكرة ال toggle تختصر عليا الصفحات  */}
                    <h2 className='mb-3'>Metal :</h2>

                    <div className="row">
                        {myData.metal.map((item, index) => 
                        <div>
                          {/* addToCart={props.addToCart} */}
                        <MetalItems token={token} getData={getData}  item={item} forminput={forminput} setValue={setValue} key={index} deleteItem={deleteMetal} isAdmin={isAdmin} myData={myData} />
                        <button onClick={()=>{fav(item._id)}}>cart</button>
                        </div>
                        )}
                        
                        {isAdmin ? <div className ='col-md-3 mb-4'>
                     {/* اذا هو ادمن بدخل الدف  */}
                        {!add ? <button onClick={showForm} className='btn btn-secondary'>Add New Metal</button> :
                          <form style={{ border: "1px solid #444", borderRadius: "5px" }} className="text-center shadow-lg pt-3 px-3">
                                <input onChange={getNameValue} className='w-75 form-control mt-5 m-auto ' type="text" placeholder='set the name' />
                                <input onChange={getDescValue} className='w-75 form-control mt-2 m-auto' type="text" placeholder='set the description' />
                                <input onChange={getimgUrl} className='w-75 form-control mt-2 m-auto' type="text" placeholder='set the image url' />
                                <button onClick={addMetal} className='btn btn-danger my-4 px-5'>Add</button>
                            </form>
                        }
                    </div> :
                     <p></p>

                    }     

                    </div>
                </div>
            </div>
            }
            <Footer />
        </div>
    )
}
