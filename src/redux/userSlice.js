import { createSlice } from "@reduxjs/toolkit";


const userReducer = createSlice({
    name:'user',
    
    initialState:{
        logged: false,
        userData:null,
    },
    reducers:{
        initLoggedState:(state,action)=>{
            const {userName,name,lastName,email,profilePicture,cartId} = action.payload
            state.logged = true
            state.userData = {
                userName:userName,
                email: email,
                name:name,
                lastName: lastName,
                profilePicture: profilePicture,
                cartId: cartId
            }

        },
        closeLoggedState:(state) =>{
            state.logged = false
            state.userData=null
        }
        
    }
})

export const {initLoggedState,closeLoggedState} = userReducer.actions
export default userReducer.reducer