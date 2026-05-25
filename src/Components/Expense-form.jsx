import React from 'react';
import {useEffect, useState, useContext} from 'react';
import EditForm from './EditForm';


function ExpenseForm(){
  
  const [item ,setitem] = useState('');
  const [price, setprice] = useState(0);
  const [description , setdescription] = useState('');
  const [quantity , setquantity] = useState(1);
  const [list , setlist] = useState([]);
  const [editIndex ,setEditIndex]= useState(null);

  // const navigate = useNavigate();
  
  
  useEffect(()=>{
    let data =localStorage.getItem("Expense Tracker");
    if (data)
    {
      setlist(JSON.parse(data));
    }
    
  },[]);
  
  useEffect(()=>{
    localStorage.setItem("Expense Tracker",JSON.stringify(list));
    
  },[list]);
  
  
  function handleItem(e)
  {
    setitem(e.target.value);
  }
  function handledescription(e)
  {
    setdescription(e.target.value);
  }
  function handlequantity(e)
  {
    setquantity(e.target.value);
  }
  function handleprice(e)
  {
    setprice(e.target.value);
  }
  
  function handleSubmit(e)
  {
    
    e.preventDefault();
    if(item.trim()=='' || description.trim()=='') return alert("enter the valid input");
    if(price<50 || quantity<1) return alert("Minimum price is 50 and minmum quatity =1");
    const currtotal = Number(quantity)*Number(price);
    
    const listdata={
      item,
      description,
      quantity,
      price,
      total:currtotal
    }

    
    setlist((prev)=>[...prev,listdata]);
    
    console.log("list",list);
    setitem('');
    setquantity(1);
    setdescription('');
    setprice('');

  }
  
  function handleCancel()
  {
    setitem('');
    setquantity(1);
    setdescription('');
    setprice('');
    
  }
  
  
  function handleDelete(id)
  {
    const newlist = list.filter((val,index)=>index!==id);
    setlist(newlist);

  }
  
  
  
  return (
    <>
      <div>
        <form>
          <label name = "items" > Item </label>
          <input
            type = "text"
            value = {item}
            name = "items"
            placeholder = "Enter the item"
            onChange = {handleItem}
          />
          
          <br></br>
          <br></br>
          <label name = "descriptions" > description </label>
          <input
            type = "text"
            value = {description}
            name = "descriptions"
            placeholder = "description of the item"
            onChange = {handledescription}
          /> 
          
          <br></br>
          <br></br>
          <label name = "quantities" > quantity </label>
          <input
            type = "number"
            value = {quantity}
            name = "quantities"
            min = "1"
            placeholder = "quantity"
            onChange = {handlequantity}
          /> 
          <br></br>
          <br></br>
          <label name = "price" > price </label>
          <input
            type = "number"
            value = {price}
            name = "price"
            min="50"
            placeholder = "price"
            onChange = {handleprice}
          />
          <br></br><br></br>
          <div>
            <button onClick={handleSubmit}> Submit </button>
            <button onClick={handleCancel}> Cancel </button>
          </div>
        </form>
      </div>
      
      
      <div>
        <ul>
          {list.map((val, index)=>{
            return (
            <div key={index}>
              <li>
                Your item {val.item} and quantity {val.quantity} and price {val.price} 
                <strong>Total</strong> {val.total}
              </li>
                <button onClick = {()=>setEditIndex(index)}> Edit </button>
                <button onClick = {()=>handleDelete(index)}> Delete </button>
            </div>
            );
            
          })}
        </ul>
        {
          editIndex !==null && (
            <EditForm
            editItem={list[editIndex]}
            editIndex={editIndex}
            list={list}
            setlist={setlist}
            setEditIndex={setEditIndex}/>
          )
        }
        

        
      </div>
    </>);
}
export default ExpenseForm;