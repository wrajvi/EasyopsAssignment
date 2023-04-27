import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { delData } from '../utills/dataSlice';
const Table = ({res,index}) => {
    const {first,last,contact,id}=res;
    const fullname=first+" "+last;
    const table=useSelector(store=>store.data.item);
     
    const dispatch=useDispatch();
    function handleClick(){
        dispatch(delData(id));
    }
 return (
    <div>
    <table className='h-10'>
        <tr>
            
            <td className='p-1 w-24 border border-red-500'>{index+1}</td>
            <td className='p-1 w-24 border border-red-500'>{fullname}</td>
            <td className='p-1 w-24 border border-red-500'>{contact}</td>
            <td className='p-1 w-24 border border-red-500 bg-green-400'><button onClick={handleClick}>Delete</button></td>
        </tr>
    </table>

    </div>
  )
}


export default Table