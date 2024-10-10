import { createSlice } from "@reduxjs/toolkit";

const onAuthSlice = createSlice({
   name:'onAuth',
   initialState:null,

   reducers:{
      setOnAuthState:(state,payload)=>{
         state = payload
      }
   }
})

export const {setOnAuthState} = onAuthSlice.actions
export default onAuthSlice.reducer
