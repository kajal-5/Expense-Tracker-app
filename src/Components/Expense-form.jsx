import React from 'react';

import {useState , useEffect} from 'react';
import EditForm from './EditForm';

function ExpenseTracker()
{
  const [product, setProduct] = useState('');
  const [price , setPrice] = useState(0);
  const [quantity , setquantity] = useState();
  const [total ,settotal] = useState(0);
  const [select , setSelect] = useState('');

  const [list, setlist] = useState([]);
  const [Total ,setTotal] = useState(0);

  const [Edit , setEdit] = useState(null);




  function handleSubmit(e){
    e.preventDefault();


    if(price<50 || quantity <1) return alert("enter valid quantity or price");
    if(product.trim()=='') return alert("enter valid product");
    const totalval =Number(price)* Number(quantity);
    const data= {
      id : Date.now(),
      product,
      price,
      select,
      quantity,
      total:totalval,
      date :new Date()
    }
    setTotal((prev)=>prev+=totalval);

    setlist((prevList) => [...prevList, data]);
    setProduct('');
    setPrice(0);
    setquantity(0);
    setSelect('');



  }

  function handleEdit(val)
  {
    setEdit(val);
  }

  function handleCancel()
  {
    setProduct('');
    setPrice(0);
    setquantity(0);
    setSelect('');    

  }

  return (
    <>
    <form>
      <label for="product"> Product</label>
      <input
        type="text"
        value={product}
        name="product"
        placeholder="Enter the product"
        onChange={(e)=>setProduct(e.target.value)}
      />
      <br></br><br></br>
      <label htmlFor="category">Category</label>
      <select value={select} onChange={(e)=>setSelect(e.target.value)}>
        <option value="food" > food </option>
        <option value="travel" > travel </option>
        <option value="cloth" > Cloth </option>
        <option value="books" > books</option>
      </select>
      <br></br><br></br>
      <label htmlFor="quantity"> Quantity</label>
      <input
        type="number"
        value={quantity}
        name="quantity"
        min="1"
        placeholder="quantity"
        onChange={(e)=>setquantity(e.target.value)}
      />
      <br></br><br></br>
      <label htmlFor="price"> Price</label>
      <input
        type="number"
        value={price}
        name="price"
        min="50"
        placeholder="price"
        onChange={(e)=>setPrice(e.target.value)}
      />
      <br></br><br></br>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>


    <div>
      <ul>
        {
          list.map((val)=>{
            return (
              <>
              <li key ={val.id}>
                this is your item {val.product} and price {val.price} , quantity {val.quantity} and Total is {val.total}
                <button onClick={()=>handleEdit(val)}>Edit</button>
                <button>Cancel</button>
              </li>
              </>
            );

          })
        }
      </ul>
      <p>Total Amount is {Total}</p>

      {
        <EditForm 
        edit={Edit}
        setedit={setEdit}
        list={list}
        setlist={setlist}/>
      }
    </div>
    </>
  );






}




export default ExpenseTracker;