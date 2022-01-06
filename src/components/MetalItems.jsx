import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function MetalItems(props) {
    const [forminput, setforminput] = useState(false)
    const [inputValue, setinputValue] = useState("");
    const [token, settoken] = useState(props.token)
    const [itemObject, setitemObject] = useState({})
    const [descInput, setdescInput] = useState(false)
    const [myData, setmyData] = useState([])

useEffect(() => {
    settoken(props.token)
    setitemObject(props.item)
    // setmyData(props.myData.metal)
}, [])

    const editName=() =>{
        setforminput(!forminput)
    }
    const setValue=(e)=> {
        setinputValue(e.target.value);
    }

     const deleteItem=async(id) =>{
        let response = await axios.delete(`https://metalapi.herokuapp.com/metal/${id}`
            ,{ headers: { authorization: "Bearer " + token } }
        )
        props.getData()

    }
    const updateItem = (e) => {
        e.preventDefault();
        changeValue(inputValue);
    }
    
    const changeValue=(value)=> {
        let newItemObject = { ...itemObject }
        newItemObject.name = value;
        setitemObject(newItemObject);
        setforminput(false);
    }
    const updateItemdesc=(e)=> {
        e.preventDefault();
        changeDesc(inputValue);
    }

    const changeDesc=(value)=> {
        let newItemdesc = { ...itemObject }
        newItemdesc.description = value;
        setitemObject(newItemdesc);
        setdescInput(false);
    }
    
    const editDesc=()=> {
        setdescInput(!descInput)
    }
   
    return (
       
            <div className="col-md-3 mb-4" >
            
            <div style={{ border: "1px solid #444", borderRadius: "5px" }} className='text-center shadow-lg position-relative'>
                {props.isAdmin ? <button onClick={() => deleteItem(itemObject._id)} className='bg-warning position-absolute p-1 border-1 rounded-3'>Delete</button>
                    : ""}
                <img src={itemObject.img_url} className="w-100" style={{ height: "150px" }} alt="not found " />
                {/* input update */}
                <div>
                    {forminput ? <form onSubmit={updateItem} className='d-flex justify-content-around mx-1 mt-1'>
                        <input className=' form-control border-none ' onChange={setValue} type="text" defaultValue={itemObject.name} />
                        <button className='rounded-1 p-1 fw-bold bg-danger text-light border-0'> change </button>
                    </form> : ''}
                </div>

                <div className='d-flex justify-content-between p-2'>
                    <h2>{itemObject.name}</h2> {props.isAdmin ? <button onClick={editName} className='btn-secondary rounded-start rounded-end px-2'>Edit</button> : ''}
                </div>
                {/* input update */}
                <div>
                    {descInput ? <form onSubmit={updateItemdesc} className='d-flex justify-content-around mx-1 mt-1'>
                        <input className=' form-control border-none ' onChange={setValue} type="text" defaultValue={itemObject.description} />
                        <button className='rounded-1 p-1 fw-bold bg-danger text-light border-0'> change </button>
                    </form> : ''}
                </div>
                <div className='d-flex justify-content-between p-2'>
                    <p>{itemObject.description}</p> {props.isAdmin ? <button onClick={editDesc} className='btn-secondary rounded-start rounded-end px-2'>Edit</button> : ''}
                </div>
                {/* {props.isAdmin? " " :<i onClick={()=>props.addToCart(itemObject._id)} class="fas fa-cart-plus fa-2x text-danger"></i>} */}
            </div> 

            </div>
       
    )
}
