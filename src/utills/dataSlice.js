import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name:"data",
    initialState:{
        item:[],
    },
    reducers:{
        addData:(state,action)=>{
                state.item.push(action.payload);
        },
        delData:(state,action)=>{
               const newdata=state.item.filter((ele)=>ele.id!==action.payload);
               state.item=newdata;
        },
        update:(state,action)=>{
            state.item=action.payload;
        }
    }
});




export const{addData,delData,update}=dataSlice.actions;
export default dataSlice.reducer;