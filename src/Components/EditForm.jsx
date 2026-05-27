import React from 'react'
import {useState, useEffect} from 'react';

function EditForm({edit,setedit, list , setlist})
{
    const [price, setprice] = useState(0);
    const [product , setproduct] = useState('');
    const [select, setSelect] = useState('');
    const [quantity, setquantity] = useState(0);

   useEffect(()=>{
    if(edit)
    {
        setproduct(edit.product);
        setprice(edit.price);
        setSelect(edit.select);
        setquantity(edit.quantity);

    }

   },[edit]);

   if(!edit) return null;


    function handleSave(e)
    {
        e.preventDefault();

        const totalval = Number(price)*Number(quantity);

        const data={
            id :edit.id,
            date:edit.date,
            price,
            product,
            select,
            quantity,
            total:totalval
        }
        let updatelist = list.map((value)=>(value.id===edit.id)?data:value);
        setlist(updatelist);
        // setproduct('');
        // setprice(0);
        // setquantity(0);
        // setSelect('');  
        setedit(null);     

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