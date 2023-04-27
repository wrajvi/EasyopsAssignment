import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData, update } from "../utills/dataSlice";
import Table from "./Table";
import { v4 as uuidv4 } from "uuid";
import ShowSearchResult from "./ShowSearchResult";

const Body = () => {
  const [info, setInfo] = useState({
    first: "",
    last: "",
    contact: "",
  });
  const [errors, setErrors] = useState([]);
  const [query,setQuery]=useState("");
  const [showresult, setShowResult]=useState(false);
  const [searchResultObject,setSearchResultObject]=useState({});
  const [resultNotFound,setResultNotFound]=useState(false);

  const table = useSelector((store) => store.data.item);

  const dispatch = useDispatch();

  function clearsearchResult(){
         setQuery("");
         setShowResult(false);
         setSearchResultObject({});
         setResultNotFound(false);

  }

  function searchquery(){
           table.forEach( element => {
                 const fullname=element.first+" "+element.last;
                 if(fullname===query)
                 {
                     setShowResult(true);
                     setSearchResultObject({...element});
                     return;
                 }
           });
           setResultNotFound(true);
  }

  function sortByName() {
    const arr = [...table];
    arr.sort((a, b) => {
      let fa = a.first.toLowerCase() + a.last.toLowerCase();
      let fb = b.first.toLowerCase() + b.last.toLowerCase();
      

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });

    dispatch(update(arr));
  }

  function handleChange(event) {
    setInfo({ ...info, [event.target.name]: event.target.value });
  }

  function updatedata(e) {
    e.preventDefault();

    const { first, last } = info;
    const errors = [];
    const existingNames = table?.map((data) => data.first + data.last);
    if (existingNames.includes(first + last)) {
      errors.push("Data must be unique");
    }
    if (errors.length === 0) {
      const id = uuidv4();
      dispatch(addData({ ...info, id }));
    }
    setErrors(errors);
    setInfo({ first: "", last: "", contact: "", id: "" });
  }
  return (
    <div className="w-96 mx-auto ">
      <form className=" h-72 border border-emerald-200 rounded-lg bg-slate-300" onSubmit={updatedata}>
        <h1 className="font-bold p-2">Persons's Name</h1>
        <input
          className="ml-2 pl-1"
          type="text"
          name="first"
          value={info.first}
          onChange={handleChange}
          placeholder="First"
          required
        />
        <input
          className="ml-2"
          type="text"
          name="last"
          value={info.last}
          onChange={handleChange}
          placeholder="Last"
          required
        />
        <h1 className="p-2">Contact Number</h1>
        <input
          className="ml-2"
          type="text"
          name="contact"
          value={info.contact}
          onChange={handleChange}
          required
        />
        <br />
        {errors.length > 0 && (
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        <div className="flex flex-col items-center my-9">
        <button className="h-10 w-20 bg-gray-700 text-white rounded-lg shadow-lg">Submit</button>
        </div>      
      </form>
      <div className="mt-14 mb-1 mx-auto flex">
        <input className="w-96 p-2  rounded-l-full border border-gray-400" value={query} onChange={(e)=>setQuery(e.target.value)}/>
        <button className="rounded-r-full  p-2 border border-gray-400 bg-gray-200" onClick={searchquery}>🔍</button>
      </div>
      <div>
        {showresult && <ShowSearchResult data={searchResultObject} cross={clearsearchResult}/>}
        {!showresult && resultNotFound && <div onClick={()=>{
            setResultNotFound(false);
        }}>Search Result Not Found ❌</div>}
      </div>
      {table.length > 0 && (
        <table >
          <tr>
            <th className="w-24 border">S.No</th>
            <th  className="w-24 border">
              <button onClick={sortByName}>Name</button>
            </th>
            <th  className="w-24 border">Contact</th>
            <th  className="w-24 border">Delete</th>
          </tr>
        </table>
      )}
      <div>
        {table.map((e, i) => (
          <Table key={i} res={e} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Body;
