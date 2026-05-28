import React from 'react';
import { useState } from 'react';
function Search({list}){

    const [search , setSearch] = useState('');
    let filterdata = list.filter((val)=>
        (val.product.toLowerCase().includes(search.toLowerCase()) 
        || val.price.toString().includes(search) 
        || val.quantity.toString().includes(search) 
        || val.select.toLowerCase().includes(search.toLowerCase()))
    );
    return (<>
    <input
    type="text"
    name="search"
    value={search}
    onChange={(e)=>setSearch(e.target.value)}/>
    <div>
        {               
            <ul>
                {
                    filterdata.map((item)=>{
                        return (
                            <li key={item.id}>
                                {item.product} and price {item.price} and caegory {item.select} and quantity{item.quantity}

                            </li>
                        );
                    })
                }
            </ul>

        }
    </div>
    </>);



}
export default Search;