import React from 'react';
import {useState , useEffect} from 'react';
import EditForm from './EditForm';
import Search from './Search';
import axios from 'axios';


function ExpenseTracker()
{
  const [product, setProduct] = useState('');
  const [price , setPrice] = useState(0);
  const [quantity , setquantity] = useState(1);
  const [select , setSelect] = useState('');

  const [list, setlist] = useState([]);

  const [Total ,setTotal] = useState(0);//amount total

  const [Edit , setEdit] = useState(null);

  useEffect(()=>{
    // let data = localStorage.getItem("expenses");
    // if(data)
    //   setlist(JSON.parse(data));

    async function fetchData(){
      try{
        const response = await axios.get("http://localhost:4000/expenses");
        setlist(response.data);
      }
      catch(e)
      {
        console.error("error",e);
      }
    }

    fetchData();

  },[]);

  useEffect(()=>
    {
    const totalamount = list.reduce((total,val)=>total+val.total,0);
    setTotal(totalamount);
    // localStorage.setItem("expenses",JSON.stringify(list));
  },[list]);



  async function handleSubmit(e){
    try{
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
        // setTotal((prev)=>prev+totalval);
        await axios.post("http://localhost:4000/expenses", data);


        setlist((prevList) => [...prevList, data]);
        setProduct('');
        setPrice(0);
        setquantity(0);
        setSelect('');
    }
    catch(e)
    {
      console.error("error",e);
    }



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
  async function handleDelete(id)
  {
    try{
      let updatedata= list.filter((val)=>val.id!==id);

      // let deletedItem = list.find((val)=>val.id===id);
      setlist(updatedata);
      await axios.delete(`http://localhost:4000/expenses/${id}`);
  
      // setTotal((prev)=>prev-deletedItem.total);
    }
    catch(e)
    {
      console.error("error",e);
    }

  }

  return (
    <>
    <div>
      <Search list={list}/>
    </div>
    <form>
      <label htmlFor="product"> Product</label>
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
              <li key ={val.id}>
                this is your item {val.product} and price {val.price} , quantity {val.quantity} and Total is {val.total}
                <button onClick={()=>handleEdit(val)}>Edit</button>
                <button onClick={()=>handleDelete(val.id)}>Delete</button>
              </li>
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
        setlist={setlist}
        />
      }
    </div>
    </>
  );
}
export default ExpenseTracker;