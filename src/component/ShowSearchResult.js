import React from 'react'

const ShowSearchResult = ({data,cross}) => {
    console.log(data);
    const {first,last,contact}=data;
   
  return (

    <div className='p-4  bg-gray-300 rounded-lg mb-5 flex'>
       
       <div>
        <h1>{first+ " " + last}</h1>
        <h1>{contact}</h1>
       </div>
       <div className='ml-auto' onClick={()=>cross()}>❌</div>
       

    </div>
  )
}

export default ShowSearchResult