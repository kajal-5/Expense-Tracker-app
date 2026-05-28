import React from 'react'
import {useState, useEffect} from 'react';
import axios from 'axios';

function EditForm({edit,setedit, list , setlist, Total,setTotal})
{
    const [price, setprice] = useState(0);
    const [product , setproduct] = useState('');
    const [select, setSelect] = useState('');
    const [quantity, setquantity] = useState(0);

    useEffect(()=>{
        let data= localStorage.getItem("expenses");
        if(data)
            setlist(JSON.parse(data));

    },[]);

   useEffect(()=>{
    if(edit)
    {
        setproduct(edit.product);
        setprice(edit.price);
        setSelect(edit.select);
        setquantity(edit.quantity);

    }
    localStorage.setItem("expenses",JSON.stringify(list));

   },[edit]);

   if(!edit) return null;


    async function handleSave(e)
    {
        try
        {
            e.preventDefault();

            const oldItem = list.find((val)=>val.id==edit.id);
             const newtotal = Number(price)*Number(quantity);

            const data={
                id :edit.id,
                date:edit.date,
                price,
                product,
                select,
                quantity,
                total:newtotal
            }

            setTotal((prev)=>prev - oldItem.total + newtotal);
            await axios.put(`https://cadaaed02ae7a76642eb.free.beeceptor.com/expences/${edit.id}`,data);
            let updatelist = list.map((value)=>(value.id===edit.id)?data:value);
            setlist(updatelist);  
            setedit(null);  
        } 
        catch(e)
        {
            console.error("error",e);
        }  

    }


    return(
        <>
        <form>
            <label htmlFor="product"></label>
            <input
                type="text"
                name="product"
                value={product}
                onChange={(e)=>setproduct(e.target.value)}
            />
            <br></br><br></br>
            <label htmlFor="price"></label>
            <input
                type="number"
                name="price"
                min="50"
                value={price}
                onChange={(e)=>setprice(e.target.value)}
            />
            <br></br><br></br>
            <label htmlFor="quantity"></label>
            <input
                type="number"
                name="quantity"
                min="1"
                value={quantity}
                onChange={(e)=>setquantity(e.target.value)}
            />
            <br></br><br></br>
            <label htmlFor="select"></label>
            <select value={select} onChange={(e)=>setSelect(e.target.value)}>
                <option value="food">food</option>
                <option value="book">book</option>
                <option value="travel">travel</option>
                <option value="cloth">cloth</option>
            </select>
            <br></br><br></br>
            <button onClick={handleSave}>save</button>
        </form>
        </>
    )


}
export default EditForm;