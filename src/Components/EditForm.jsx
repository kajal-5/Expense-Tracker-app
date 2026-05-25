import React , {useState , useEffect} from "react";

function EditForm({
    editItem,
    editIndex,
    list,
    setlist,
    setEditIndex
})
{

    const [item ,setItem] = useState(editItem.item);
    const [description , setdescription ]= useState(editItem.description);
    const [quantity ,setquantity] = useState(editItem.quantity);
    const [price , setprice ]= useState(editItem.price); 
    
    useEffect(()=>{
        localStorage.setItem("Expense Tracker",JSON.stringify(list));

    },[list]);
    
    function handleEdit(e)
    {
        e.preventDefault();
        const update=[...list];
        update[editIndex]={
            item,
            description,
            quantity,
            price,
            total:Number(quantity)*Number(price)
        }
        setlist(update);
        setEditIndex(null);


    }
        return(
            <>
            <form>
                <label name = "items" > Item </label>
                <input
                    type = "text"
                    value = {item}  
                    name = "items"
                    placeholder = "Enter the item"
                    onChange = {(e)=>setItem(e.target.value)}
                />  
                <br></br>
                <br></br>
                <label name = "descriptions" > description </label> 
                <input
                    type = "text"
                    value = {description}       
                    name = "descriptions"
                    placeholder = "description of the item"
                    onChange = {(e)=>setdescription(e.target.value)}
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
                    onChange = {(e)=>setquantity(e.target.value)}

                />
                <br></br><br></br>            
                <label name = "price" > price </label>
                <input
                    type = "number"       
                    value = {price}
                    name = "price"
                    min="50"
                    placeholder = "price"
                    onChange = {(e)=>setprice(e.target.value)}
                />
                <br></br><br></br>
                <div>   
                    <button onClick={handleEdit}> Update </button>
                    

                </div>

            </form>
            </>
        );

}
export default EditForm;